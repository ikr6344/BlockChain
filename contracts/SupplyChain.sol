// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
contract SupplyChain {
    // Smart Contract owner will be the person who deploys the contract, only he can authorize various roles like retailer, Manufacturer, etc.
    address public Owner;

    constructor() public {
        Owner = msg.sender;
    }

    modifier onlyByOwner() {
        require(msg.sender == Owner);
        _;
    }

    enum STAGE {
        Manufacture,
        Distribution,
        Retail,
        sold
    }

    uint256 public medicineCtr = 0;
    uint256 public productCtr = 0;
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
    }

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
        uint256[] medicineIds; // Liste des médicaments associés
        uint256 MANid;
        uint256 DISid;
        uint256 RETid;
        STAGE stage;
    }

    mapping(uint256 => Product) public ProductStock;
    mapping(uint256 => medicine) public MedicineStock;

    mapping(address => uint256[]) public MedicinesByAddress; // Mapping des adresses aux identifiants des médicaments qu'elles ont ajoutés

    event LogAddMedicine(string name, string description, uint256 price);

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

    function findRMS(address _address) public view returns (uint256) {
        require(rmsCtr > 0);
        for (uint256 i = 1; i <= rmsCtr; i++) {
            if (RMS[i].addr == _address) return RMS[i].id;
        }
        return 0;
    }

    function findMAN(address _address) public view returns (uint256) {
        require(manCtr > 0);
        for (uint256 i = 1; i <= manCtr; i++) {
            if (MAN[i].addr == _address) return MAN[i].id;
        }
        return 0;
    }

    function findDIS(address _address) private view returns (uint256) {
        require(disCtr > 0);
        for (uint256 i = 1; i <= disCtr; i++) {
            if (DIS[i].addr == _address) return DIS[i].id;
        }
        return 0;
    }

    function findRET(address _address) private view returns (uint256) {
        require(retCtr > 0);
        for (uint256 i = 1; i <= retCtr; i++) {
            if (RET[i].addr == _address) return RET[i].id;
        }
        return 0;
    }

    // To supply products from Manufacturer to distributor
    function Distribute(uint256 _produitId) public {
        require(_produitId > 0 && _produitId <= productCtr);
        uint256 _id = findDIS(msg.sender);
        require(_id > 0);
        require(ProductStock[_produitId].stage == STAGE.Manufacture);
        ProductStock[_produitId].DISid = _id;
        ProductStock[_produitId].stage = STAGE.Distribution;
    }

    // To supply products from distributor to retailer
    function Retail(uint256 _produitId) public {
        require(_produitId > 0 && _produitId <= productCtr);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(ProductStock[_produitId].stage == STAGE.Distribution);
        ProductStock[_produitId].RETid = _id;
        ProductStock[_produitId].stage = STAGE.Retail;
    }

    // To sell products from retailer to consumer
    function sold(uint256 _produitId) public {
        require(_produitId > 0 && _produitId <= productCtr);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(_id == ProductStock[_produitId].RETid);
        require(ProductStock[_produitId].stage == STAGE.Retail);
        ProductStock[_produitId].stage = STAGE.sold;
    }

    // Function to add medicine
   function addMedicine(string memory _name, string memory _description, uint256 _price, uint256 _rmsId) public {
    medicineCtr++;  // Incrémenter le compteur de médicaments
    MedicineStock[medicineCtr] = medicine(medicineCtr, _name, _description, _price, _rmsId);

    // Ajout du médicament à la liste des médicaments associés à l'adresse de l'utilisateur
    MedicinesByAddress[msg.sender].push(medicineCtr); // Utiliser msg.sender pour l'adresse de l'appelant

    emit LogAddMedicine(_name, _description, _price);
}


   // Exemple de fonction de récupération des médicaments associés à une adresse
function getMedicinesByAddress(address _address) public view returns (uint256[] memory) {
    return MedicinesByAddress[_address];
}

    // Function to get the role of a specific address
    function getRole(address _address) public view returns (string memory) {
        if (isRMSRegistered(_address)) return "RawMaterialSupplier";
        if (isMANRegistered(_address)) return "Manufacturer";
        if (isDISRegistered(_address)) return "Distributor";
        if (isRETRegistered(_address)) return "Retailer";
        return "None"; // No role found
    }

    // Function to add a product containing multiple medicines
    function addProduct(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256[] memory _medicineIds,
        uint256 _MANid
    ) public {
        // Validate: Check that all medicines exist and are at the correct stage
        for (uint256 i = 0; i < _medicineIds.length; i++) {
            require(_medicineIds[i] > 0 && _medicineIds[i] <= medicineCtr, "Invalid medicine ID");
        }
        require(_MANid > 0 && _MANid <= manCtr, "Invalid MAN ID");
        require(MAN[_MANid].addr == msg.sender, "Only the manufacturer can add this product");

        productCtr++;
        ProductStock[productCtr] = Product(
            productCtr,
            _name,
            _description,
            _price,
            _medicineIds,
            _MANid,
            0,
            0,
            STAGE.Manufacture
        );
    }

function getAllMedicines() public view returns (uint256[] memory) {
    uint256[] memory allMedicines = new uint256[](medicineCtr);
    for (uint256 i = 1; i <= medicineCtr; i++) {
        allMedicines[i-1] = i;
    }
    return allMedicines;
}
function getMedicineDetails(uint256[] memory medicineIds) public view returns (medicine[] memory) {
    medicine[] memory medicinesDetails = new medicine[](medicineIds.length);
    
    for (uint256 i = 0; i < medicineIds.length; i++) {
        uint256 id = medicineIds[i];
        require(id > 0 && id <= medicineCtr, "Invalid medicine ID");
        medicinesDetails[i] = MedicineStock[id];
    }

    return medicinesDetails;
}


}
