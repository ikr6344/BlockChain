// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SupplyChain {
    //Smart Contract owner will be the person who deploys the contract only he can authorize various roles like retailer, Manufacturer,etc
    address public Owner;

    constructor() public {
        Owner = msg.sender;
    }

    //Roles (flow of pharma supply chain)
    // RawMaterialSupplier; //This is where Manufacturer will get raw materials to make medicines
    // Manufacturer;  //Various WHO guidelines should be followed by this person
    // Distributor; //This guy distributes the medicines to retailers
    // Retailer; //Normal customer buys from the retailer

    modifier onlyByOwner() {
        require(msg.sender == Owner);
        _;
    }

    enum STAGE {
        Init,
        RawMaterialSupply,
        Manufacture,
        Distribution,
        Retail,
        sold
    }

    uint256 public medicineCtr = 0;
    uint256 public rmsCtr = 0;
    uint256 public manCtr = 0;
    uint256 public disCtr = 0;
    uint256 public retCtr = 0;

    struct medicine {
    uint256 id;
    string name;
    string description;
    uint256 price; 
    uint256 RMSid;
    uint256 MANid;
    uint256 DISid;
    uint256 RETid;
    STAGE stage;
}


    mapping(uint256 => medicine) public MedicineStock;

    function showStage(
        uint256 _medicineID
    ) public view returns (string memory) {
        require(medicineCtr > 0);
        if (MedicineStock[_medicineID].stage == STAGE.Init)
            return "Goods Ordered";
        else if (MedicineStock[_medicineID].stage == STAGE.RawMaterialSupply)
            return "Raw Material Supply Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Manufacture)
            return "Manufacturing Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Distribution)
            return "Distribution Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Retail)
            return "Retail Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.sold)
            return "Goods Sold";
    }

    struct rawMaterialSupplier {
        address addr;
        uint256 id;
        string name;
        string place;
    }

    mapping(uint256 => rawMaterialSupplier) public RMS;

    struct manufacturer {
        address addr;
        uint256 id;
        string name;
        string place;
    }

    mapping(uint256 => manufacturer) public MAN;

    struct distributor {
        address addr;
        uint256 id;
        string name;
        string place;
    }

    mapping(uint256 => distributor) public DIS;

    struct retailer {
        address addr;
        uint256 id;
        string name;
        string place;
    }

    mapping(uint256 => retailer) public RET;

    // Add Raw Material Supplier
    function addRMS(address _address, string memory _name, string memory _place) public {
        require(!isRMSRegistered(_address), "RMS already registered");
        rmsCtr++;
        RMS[rmsCtr] = rawMaterialSupplier(_address, rmsCtr, _name, _place);
    }

    // Add Manufacturer
    function addManufacturer(address _address, string memory _name, string memory _place) public {
        require(!isMANRegistered(_address), "Manufacturer already registered");
        manCtr++;
        MAN[manCtr] = manufacturer(_address, manCtr, _name, _place);
    }

    // Add Distributor
    function addDistributor(address _address, string memory _name, string memory _place) public {
        require(!isDISRegistered(_address), "Distributor already registered");
        disCtr++;
        DIS[disCtr] = distributor(_address, disCtr, _name, _place);
    }

    // Add Retailer
    function addRetailer(address _address, string memory _name, string memory _place) public {
        require(!isRETRegistered(_address), "Retailer already registered");
        retCtr++;
        RET[retCtr] = retailer(_address, retCtr, _name, _place);
    }

    // Private helper functions to check if an address is already registered for a role

    function isRMSRegistered(address _address) private view returns (bool) {
        for (uint256 i = 1; i <= rmsCtr; i++) {
            if (RMS[i].addr == _address) return true;
        }
        return false;
    }

    function isMANRegistered(address _address) private view returns (bool) {
        for (uint256 i = 1; i <= manCtr; i++) {
            if (MAN[i].addr == _address) return true;
        }
        return false;
    }

    function isDISRegistered(address _address) private view returns (bool) {
        for (uint256 i = 1; i <= disCtr; i++) {
            if (DIS[i].addr == _address) return true;
        }
        return false;
    }

    function isRETRegistered(address _address) private view returns (bool) {
        for (uint256 i = 1; i <= retCtr; i++) {
            if (RET[i].addr == _address) return true;
        }
        return false;
    }

    // To supply raw materials from RMS supplier to the manufacturer
    function RMSsupply(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findRMS(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.Init);
        MedicineStock[_medicineID].RMSid = _id;
        MedicineStock[_medicineID].stage = STAGE.RawMaterialSupply;
    }

    function findRMS(address _address) private view returns (uint256) {
        require(rmsCtr > 0);
        for (uint256 i = 1; i <= rmsCtr; i++) {
            if (RMS[i].addr == _address) return RMS[i].id;
        }
        return 0;
    }

    // To manufacture medicine
    function Manufacturing(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findMAN(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.RawMaterialSupply);
        MedicineStock[_medicineID].MANid = _id;
        MedicineStock[_medicineID].stage = STAGE.Manufacture;
    }

    function findMAN(address _address) private view returns (uint256) {
        require(manCtr > 0);
        for (uint256 i = 1; i <= manCtr; i++) {
            if (MAN[i].addr == _address) return MAN[i].id;
        }
        return 0;
    }

    // To supply medicines from Manufacturer to distributor
    function Distribute(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findDIS(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.Manufacture);
        MedicineStock[_medicineID].DISid = _id;
        MedicineStock[_medicineID].stage = STAGE.Distribution;
    }

    function findDIS(address _address) private view returns (uint256) {
        require(disCtr > 0);
        for (uint256 i = 1; i <= disCtr; i++) {
            if (DIS[i].addr == _address) return DIS[i].id;
        }
        return 0;
    }

    // To supply medicines from distributor to retailer
    function Retail(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.Distribution);
        MedicineStock[_medicineID].RETid = _id;
        MedicineStock[_medicineID].stage = STAGE.Retail;
    }

    function findRET(address _address) private view returns (uint256) {
        require(retCtr > 0);
        for (uint256 i = 1; i <= retCtr; i++) {
            if (RET[i].addr == _address) return RET[i].id;
        }
        return 0;
    }

    // To sell medicines from retailer to consumer
    function sold(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(_id == MedicineStock[_medicineID].RETid);
        require(MedicineStock[_medicineID].stage == STAGE.Retail);
        MedicineStock[_medicineID].stage = STAGE.sold;
    }
function addMedicine(
    string memory _name,
    string memory _description,
    uint256 _price
) public {
    // Affichage des paramètres reçus pour la vérification
    emit LogAddMedicine(_name, _description, _price);

    medicineCtr++;
    MedicineStock[medicineCtr] = medicine(
        medicineCtr,
        _name,
        _description,
        _price, // Ajout du prix
        0,
        0,
        0,
        0,
        STAGE.Init
    );
}

event LogAddMedicine(string name, string description, uint256 price);


    
    }
