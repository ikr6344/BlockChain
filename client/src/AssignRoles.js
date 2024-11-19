import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import profile from "./image/a.png";

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
        fetchCountries();
    }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else {
            alert("Non-Ethereum browser detected. Install MetaMask.");
        }
    };

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

    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            const countryList = response.data.map((country) => ({
                name: country.name.common,
                code: country.cca2
            }));
            setCountries(countryList);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

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
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    if (loader) return <div>Loading...</div>;

    return (
        <><style>
            {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
          }

          .login-box {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            padding: 30px;
            width: 350px;
            text-align: center;
          }

          .login-avatar img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-bottom: 20px;
          }

          h2 {
            margin-bottom: 20px;
            color: #333;
          }

          .login-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
    outline: none;
}

.login-input:focus {
    border-color: #6a0dad;
    box-shadow: 0 0 5px rgba(106, 13, 173, 0.5);
}


          .login-button {
            width: 100%;
            padding: 10px;
            background: #6a0dad;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .login-button:hover {
            background: #540c9b;
          }

          .error-message {
            color: red;
            font-size: 14px;
          }

          .success-message {
            color: green;
            font-size: 14px;
          }

          .link {
            margin-top: 15px;
            font-size: 14px;
            color: #6a0dad;
          }

          .link a {
            color: #6a0dad;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s;
          }

          .link a:hover {
            color: #540c9b;
          }
        `}
        </style><div className="login-container">
                <div className="login-box">
                    <div className="login-avatar">
                        <img src={profile} alt="profile" />
                    </div>
                    <h4>Sign Up</h4>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <select
                                name="roleType"
                                value={formData.roleType}
                                onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                                required
                                className="login-input"

                            >
                                <option value="">Select Role</option>
                                <option value="RMS">Raw Material Supplier</option>
                                <option value="MAN">Manufacturer</option>
                                <option value="DIS">Distributor</option>
                                <option value="RET">Retailer</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="address"
                                placeholder="Ethereum Address"
                                value={formData.address}
                                className="login-input"

                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                required />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="login-input"

                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required />
                        </div>

                        <div className="form-group">
                            <select
                                name="place"
                                value={formData.place}
                                className="login-input"

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

                        <button type="submit" className="login-button">Register Role</button>
                    </form>
                    <p className="link">
                        Vous avez déjà un compte ? <a href="/">Connectez-vous</a>
                    </p>
                </div>
            </div></>
    );
}

export default AssignRoles;
