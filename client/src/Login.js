import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SupplyChainABI from './artifacts/SupplyChain.json';
import { useHistory } from 'react-router-dom';
import './Login.css';
import profile from "./image/a.png";
import email from "./image/email.jpg";
import pass from "./image/pass.png";
const Login = () => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [supplyChain, setSupplyChain] = useState(null);
  const [loader, setLoader] = useState(true);
  const history = useHistory();

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  // Initialiser Web3
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      alert("Non-Ethereum browser detected. Install MetaMask.");
    }
  };

  // Charger les données blockchain
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();

    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const contract = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
      setSupplyChain(contract);
    } else {
      alert("Smart contract not deployed to the current network.");
    }
    setLoader(false);
  };

  // Gestion de la connexion
  const handleLogin = async () => {
    if (!Web3.utils.isAddress(address)) {
      setError('Adresse Ethereum invalide.');
      return;
    }

    try {
      if (!supplyChain) {
        setError('Contrat non chargé.');
        return;
      }

      // Appeler le contrat pour obtenir le rôle
      const role = await supplyChain.methods.getRole(address).call();
      if (role === "None") {
        setError("Adresse non enregistrée ou rôle non attribué.");
        return;
      }

      // Redirection basée sur le rôle
      if (role === "RawMaterialSupplier") history.push('/home');
      if (role === "Manufacturer") history.push('/addmed');
      if (role === "Distributor") history.push('/track');
      if (role === "Retailer") history.push('/roles');
    } catch (err) {
      setError("Erreur lors de la vérification du rôle.");
    }
  };

  if (loader) return <div>Chargement en cours...</div>;

  return (
    <>
      <style>
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
            width: 100px;
            height: 100px;
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
      </style>
      <div className="login-container">
        <div className="login-box">
          <div className="login-avatar">
            <img
              src={profile} alt="profile"
            />
          </div>
          <h4>Login Page</h4>
          <input
            type="text"
            className="login-input"
            placeholder="Enter Ethereum address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          
          <p className="link">
            Vous n'avez pas de compte ? <a href="/roles">Inscrivez-vous</a>
          </p>
        </div>
      </div>
    </>
  );

  
  
};

export default Login;
