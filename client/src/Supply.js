import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import "./Supply.css"; // Additional CSS file for custom styling if needed

function Supply() {
  const history = useHistory();
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setLoader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState({});
  const [MedStage, setMedStage] = useState([]);
  const [ID, setID] = useState("");

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
              {Object.keys(MED).map((key) => (
                <tr key={key}>
                  <td>{MED[key].id}</td>
                  <td>{MED[key].name}</td>
                  <td>{MED[key].description}</td>
                  <td>{MedStage[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {[
            { label: "Step 1: Supply Raw Materials", method: "RMSsupply" },
            { label: "Step 2: Manufacture", method: "Manufacturing" },
            { label: "Step 3: Distribute", method: "Distribute" },
            { label: "Step 4: Retail", method: "Retail" },
            { label: "Step 5: Mark as Sold", method: "sold" }
          ].map((step, index) => (
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
    </div>
  );
}

export default Supply;
