import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter, Link } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </Router>
  );
}

export default App;
