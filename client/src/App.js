import './App.css';
import AssignRoles from './AssignRoles';
import Home from './Home';
import AddMed from './AddMed';
import produit from './AddProduit';

import Supply from './Supply'
import Track from './Track'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/produit" exact component={produit} />
          

          <Route path="/roles" component={AssignRoles} />
          <Route path="/addmed" component={AddMed} />
          <Route path="/supply" component={Supply} />
          <Route path="/track" component={Track} />
        </Switch>
      </Router>
    </div>
  );
}



export default App;
