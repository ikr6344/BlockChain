import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './AssignRole.css';

function AssignRoles() {
    const history = useHistory();
    const [currentAccount, setCurrentAccount] = useState("");
    const [loader, setLoader] = useState(true);
    const [supplyChain, setSupplyChain] = useState();
    const [formData, setFormData] = useState({ roleType: '', address: '', name: '', place: '' });
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
        fetchCountries(); // Call API to fetch countries
    }, []);

    // Initialize Web3
    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else {
            alert("Non-Ethereum browser detected. Install MetaMask.");
        }
    };
    const redirect_to_home = () => {
        history.push('/');
    };
    // Load blockchain data
    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplyChain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplyChain);
        } else {
            alert("Smart contract not deployed to current network");
        }
        setLoader(false);
    };

    // Fetch countries from API
    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            const countryList = response.data.map((country) => ({
                name: country.name.common,
                code: country.cca2 // Country code (for example "US", "FR", etc.)
            }));
            setCountries(countryList);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { roleType, address, name, place } = formData;

        try {
            if (roleType === "RMS") {
                await supplyChain.methods.addRMS(address, name, place).send({ from: currentAccount });
            } else if (roleType === "MAN") {
                await supplyChain.methods.addManufacturer(address, name, place).send({ from: currentAccount });
            } else if (roleType === "DIS") {
                await supplyChain.methods.addDistributor(address, name, place).send({ from: currentAccount });
            } else if (roleType === "RET") {
                await supplyChain.methods.addRetailer(address, name, place).send({ from: currentAccount });
            }
            console.log(formData);

        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    if (loader) return <div>Loading...</div>;

    return (
        <div className="assign-roles-container">
            <div className="header">
                <h1>Registre</h1>
                <p>Current Account: {currentAccount}</p>
                <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm" >HOME</span>

            </div>
            <form onSubmit={handleSubmit} className="assign-roles-form">
                <div className="form-group">
                    <label htmlFor="roleType">Select Role</label>
                    <select
                        name="roleType"
                        value={formData.roleType}
                        onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="RMS">Raw Material Supplier</option>
                        <option value="MAN">Manufacturer</option>
                        <option value="DIS">Distributor</option>
                        <option value="RET">Retailer</option>
                    </select>
                </div>

                <div className="form-group inline-inputs">
    <div className="inline-input">
        <label htmlFor="address">Address ETh</label>
        <input
            type="text"
            name="address"
            placeholder="Ethereum Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
        />
    </div>
    
    <div className="inline-input">
        <label htmlFor="name">Name</label>
        <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
        />
    </div>
</div>

                <div className="form-group">
                    <label htmlFor="place">Based In</label>
                    <select
                        name="place"
                        value={formData.place}
                        onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                        required
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submit-btn">Register Role</button>
            </form>
            
        </div>
    );
}

export default AssignRoles;
