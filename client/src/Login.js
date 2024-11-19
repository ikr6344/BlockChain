import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
const LoginPage = ({ onLogin }) => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Remplacez ceci par une vérification avec un smart contract
    const isOwner = address === "0x4cE07870C18110419F9951645F509FE040E931F9"; // Exemple d'adresse Owner

    if (isOwner) {
      onLogin({ address, isOwner });
      navigate("/home");
    } else {
      alert("Seul l'Owner peut se connecter.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Connexion</h1>
      <input
        type="text"
        placeholder="Entrez votre adresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <button onClick={handleLogin} style={{ padding: "5px 10px" }}>
        Se connecter
      </button>
    </div>
  );
};

export default LoginPage;
