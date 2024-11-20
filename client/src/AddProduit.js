import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import { useHistory } from "react-router-dom";
import SupplyChainABI from "./artifacts/SupplyChain.json"; // Assurez-vous que votre ABI est importée
import './AddProductComponent.css'; // Importation du fichier CSS

function AddProductComponent() {
    const history = useHistory();
    const [currentAccount, setCurrentAccount] = useState("");
    const [loader, setLoader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [Medicines, setMedicines] = useState([]); // Pour stocker les médicaments récupérés
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [selectedMedicines, setSelectedMedicines] = useState([]); // Pour stocker les IDs des médicaments sélectionnés
    const [rmsId, setRmsId] = useState(""); // Stocker l'ID du RMS
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const allProducts = await SupplyChain.methods.getAllProducts().call();
        setProducts(allProducts);
    };

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
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

    const loadBlockchainData = async () => {
        setLoader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        
        if (networkData) {
            const supplyChain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplyChain);

            try {
                // Récupérer tous les médicaments
                const medicines = await supplyChain.methods.getAllMedicines().call();
                const medicinesFormatted = medicines.map(medicine => {
                    return {
                        id: medicine.toString(),
                        name: `Medicine #${medicine.toString()}`,
                    };
                });
                setMedicines(medicinesFormatted);

                // Récupérer le nombre de produits
                const productCount = await supplyChain.methods.productCtr().call();
                if (productCount > 0) {
                    const allProducts = await supplyChain.methods.getAllProducts().call();
                    setProducts(allProducts);
                }

                // Récupérer l'ID MAN associé à l'adresse actuelle
                const rmsIdFromBlockchain = await supplyChain.methods.findMAN(accounts[0]).call();
                if (rmsIdFromBlockchain.toString() === "0") {
                    alert("No MAN associated with this account!");
                } else {
                    setRmsId(rmsIdFromBlockchain.toString());
                }

            } catch (err) {
                console.error("Error fetching data from contract:", err);
            }
            setLoader(false);
        } else {
            alert('The smart contract is not deployed to the current network');
        }
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();

        // Vérification si des médicaments ont été sélectionnés
        if (selectedMedicines.length === 0) {
            alert("Please select at least one medicine.");
            return;
        }

        // Vérification si tous les champs sont remplis
        if (!productName || !productDescription || !productPrice) {
            alert("Please fill all product fields.");
            return;
        }

        // Vérification que l'ID du RMS est récupéré
        if (!rmsId || rmsId === "0") {
            alert("RMS ID is invalid or not found.");
            return;
        }

        try {
            const receipt = await SupplyChain.methods
                .addProduct(productName, productDescription, productPrice, selectedMedicines, rmsId)
                .send({ from: currentAccount });

            if (receipt) {
                history.push('/produit');
            }
        } catch (err) {
            console.error("Error adding product:", err);
            alert("An error occurred while adding the product. Check the console for more details.");
        }
    };

    const handleSelectMedicines = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedMedicines(selectedOptions);
    };

    if (loader) {
        return <div className="loader"><h1>Loading...</h1></div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div style={styles.header}>
                    <span><b>Current Account Address:</b> {currentAccount}</span>
                    <span onClick={() => history.push('/')} className="btn btn-outline-danger btn-sm" style={styles.homeButton}>HOME</span>
                </div>

                <h5>Add Product:</h5>
                <form onSubmit={handleAddProduct} style={styles.form}>
                    <input
                        className="form-control-sm"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Product Name"
                        required
                        style={styles.input}
                    />
                    <input
                        className="form-control-sm"
                        type="text"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Product Description"
                        required
                        style={styles.input}
                    />
                    <input
                        className="form-control-sm"
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="Product Price"
                        required
                        style={styles.input}
                    />
                    <select
                        multiple={true}
                        onChange={handleSelectMedicines}
                        required
                        style={styles.select}
                    >
                        <option value="">Select Medicines</option>
                        {Medicines.map((medicine) => (
                            <option key={medicine.id} value={medicine.id}>
                                {medicine.name} - ID: {medicine.id}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-outline-success btn-sm" style={styles.submitButton}>
                        Add Product
                    </button>
                </form>

                <h5>All Products:</h5>
                <table className="table table-bordered" style={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stage</th>
                            <th>Manufacturer ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stage}</td>
                                    <td>{product.MANid}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6">No products found.</td></tr>
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
        gap: '10px',
        marginBottom: '20px'
    },
    input: {
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    },
    select: {
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    },
    submitButton: {
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    table: {
        marginTop: '30px',
        width: '100%',
        textAlign: 'center',
    },
    loader: {
        textAlign: 'center',
        fontSize: '24px',
    }
};

export default AddProductComponent;
