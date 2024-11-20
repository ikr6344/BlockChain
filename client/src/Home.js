import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  const redirectTo = (path) => {
    history.push(path);
  };

  return (
    
    <div style={styles.container}>
      <div style={styles.content}>
        <h3>Supply Chain Manager</h3>
        
        <h5>Step 1: Register Roles</h5>
        <div style={styles.buttonGroup}>
          <button onClick={() => redirectTo("/roles")} style={styles.button}>
            Register
          </button>
          <h5>Step 2: Order Goods</h5>
          <button onClick={() => redirectTo("/addmed")} style={styles.button}>
            Order Goods
          </button>
          <h5>Step 3: Control Supply Chain</h5>
          <button onClick={() => redirectTo("/supply")} style={styles.button}>
            Control Supply Chain
          </button>
        </div>
        <hr style={styles.divider} />
        <h5><b>Track</b> the goods:</h5>
        <button onClick={() => redirectTo("/track")} style={styles.button}>
          Track Goods
        </button>
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
    background: 'linear-gradient(135deg, #F2E9E4, #C9ADA7)', // Gradient background
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    backgroundColor: '#FFF', // White background
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '30px',
  },
  button: {
    padding: '15px',
    fontSize: '18px',
    color: '#FFF',
    backgroundColor: '#8A817C', // Button color
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  buttonHover: {
    backgroundColor: '#6B705C', // Hover color
  },
  note: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
  },
  stepNote: {
    fontSize: '12px',
    color: '#888',
  },
  divider: {
    margin: '20px 0',
    border: 'none',
    height: '1px',
    backgroundColor: '#ddd',
  },
};

export default Home;
