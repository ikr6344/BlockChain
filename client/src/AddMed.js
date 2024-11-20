import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function AddMed() {
    const history = useHistory();
    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setLoader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [Medicines, setMedicines] = useState([]); // État pour stocker les médicaments récupérés
    const [MedName, setMedName] = useState("");
    const [MedDes, setMedDes] = useState("");
    const [MedPrice, setMedPrice] = useState(""); 
    const [rmsId, setRmsId] = useState(null);

    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
        }
    };

    const loadBlockchaindata = async () => {
        setLoader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setCurrentaccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
    
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
    
            try {
                // Récupérer l'ID RMS associé à l'utilisateur connecté
                const rmsId = await supplychain.methods.findRMS(accounts[0]).call();
                if (rmsId.toString() === "0") {
                    alert("No RMS associated with this account!");
                } else {
                    console.log("RMS ID:", rmsId);
                    setRmsId(rmsId.toString());
                }

                // Appeler la fonction getMedicinesByAddress pour récupérer les médicaments de l'utilisateur
                const medicines = await supplychain.methods.getMedicinesByAddress(accounts[0]).call();
                console.log("Medicines for this address:", medicines);
                setMedicines(medicines);
                
            } catch (err) {
                console.error("Error fetching data from contract:", err);
            }
            setLoader(false);
        } else {
            alert('The smart contract is not deployed to the current network');
        }
    };

    const redirect_to_home = () => {
        history.push('/');
    };

    const handlerChangeNameMED = (event) => setMedName(event.target.value);
    const handlerChangeDesMED = (event) => setMedDes(event.target.value);
    const handlerChangePriceMED = (event) => setMedPrice(event.target.value);

    const handlerSubmitMED = async (event) => {
        event.preventDefault();
        try {
            const receipt = await SupplyChain.methods
                .addMedicine(MedName, MedDes, MedPrice, rmsId)
                .send({ from: currentaccount });
            if (receipt) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred while adding the medicine.");
            console.error(err);
        }
    };

    if (loader) {
        return (
            <div style={styles.container}>
                <h1 className="wait">Loading...</h1>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div style={styles.header}>
                    <span><b>Current Account Address:</b> {currentaccount}</span>
                    <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm" style={styles.homeButton}>HOME</span>
                </div>
                <h5>Add Goods Order:</h5>
                <form onSubmit={handlerSubmitMED} style={styles.form}>
                    <input
                        className="form-control-sm"
                        type="text"
                        onChange={handlerChangeNameMED}
                        placeholder="Goods Name"
                        required
                        style={{ ...styles.input, marginBottom: '10px' }} 
                    />
                    <input
                        className="form-control-sm"
                        type="text"
                        onChange={handlerChangeDesMED}
                        placeholder="Goods Description"
                        required
                        style={{ ...styles.input, marginBottom: '10px' }} 
                    />
                    <input
                        className="form-control-sm"
                        type="number"
                        onChange={handlerChangePriceMED}
                        placeholder="Goods Price"
                        required
                        style={{ ...styles.input, marginBottom: '10px' }}
                    />
                    <button className="btn btn-outline-success btn-sm" style={{ ...styles.submitButton, marginTop: '10px' }}>
                        Order
                    </button>
                </form>

                <h5>Ordered Goods:</h5>
                <table className="table table-bordered" style={styles.table}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Medicines.length > 0 ? (
                            Medicines.map((medicine, index) => (
                                <tr key={index}>
                                    <td>{medicine.id}</td>
                                    <td>{medicine.name}</td>
                                    <td>{medicine.description}</td>
                                    <td>{medicine.price}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4">No medicines found for this address.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f0f4c3 30%, #c5e1a5 90%)',
        padding: '20px'
    },
    content: {
        backgroundColor: '#ffffffcc',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        maxWidth: '700px',
        width: '100%',
        textAlign: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    homeButton: {
        cursor: 'pointer'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    input: {
        marginBottom: '10px',
        padding: '5px',
    },
    submitButton: {
        marginTop: '10px',
        alignSelf: 'flex-start'
    },
    table: {
        marginTop: '20px'
    }
};

export default AddMed;
