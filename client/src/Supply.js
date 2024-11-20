import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import "./Supply.css"; // CSS supplémentaire si nécessaire

function Supply() {
  const history = useHistory();
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setLoader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState({});
  const [MedStage, setMedStage] = useState([]);
  const [ID, setID] = useState("");
  const [userRole, setUserRole] = useState("None"); // Rôle de l'utilisateur connecté

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
      alert("Non-Ethereum browser detected. Consider using MetaMask!");
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

      // Récupérer le rôle de l'utilisateur connecté
      const role = await supplychain.methods.getRole(accounts[0]).call();
      setUserRole(role);

      // Charger les données des marchandises et leurs étapes
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (let i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
    } else {
      alert("Smart contract not deployed to the current network");
    }
    setLoader(false);
  };

  const handleTransaction = async (method, id) => {
    try {
      await SupplyChain.methods[method](id).send({ from: currentaccount });
      loadBlockchaindata();
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const redirectToHome = () => history.push("/");

  const stepsByRole = {
    RawMaterialSupplier: [{ label: "Supply Raw Materials", method: "RMSsupply" }],
    Manufacturer: [{ label: "Manufacture", method: "Manufacturing" }],
    Distributor: [{ label: "Distribute", method: "Distribute" }],
    Retailer: [{ label: "Retail", method: "Retail" }],
    None: [] // Aucun rôle, donc aucune étape
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="text-muted"><b>Current Account Address:</b> {currentaccount}</p>
        <button onClick={redirectToHome} className="btn btn-outline-danger btn-sm">HOME</button>
      </div>

      {loader ? (
        <div className="text-center">
          <h3 className="text-primary">Loading...</h3>
        </div>
      ) : (
        <>
          <h5 className="mt-4">Supply Chain Flow</h5>
          <p className="mb-4">
            Goods Order -&gt; Raw Material Supplier -&gt; Manufacturer -&gt; Distributor -&gt; Retailer -&gt; Consumer
          </p>

          {userRole === "None" ? (
            <p className="text-danger">You do not have a role in the supply chain.</p>
          ) : (
            <>
              <table className="table table-sm table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Goods ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Current Processing Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(MED).filter((key) => {
                    if (userRole === "RawMaterialSupplier") return MedStage[key] === "0";
                    if (userRole === "Manufacturer") return MedStage[key] === "1";
                    if (userRole === "Distributor") return MedStage[key] === "2";
                    if (userRole === "Retailer") return MedStage[key] === "3";
                    return false; // Aucun rôle ou étape non pertinente
                  }).map((key) => (
                    <tr key={key}>
                      <td>{MED[key].id}</td>
                      <td>{MED[key].name}</td>
                      <td>{MED[key].description}</td>
                      <td>{MedStage[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {stepsByRole[userRole]?.map((step, index) => (
                <div key={index} className="my-4">
                  <h6><b>{step.label}</b></h6>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleTransaction(step.method, ID);
                    }}
                  >
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      onChange={(e) => setID(e.target.value)}
                      placeholder="Enter Goods ID"
                      required
                    />
                    <button type="submit" className="btn btn-success btn-sm">Submit</button>
                  </form>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Supply;
