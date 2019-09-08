import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateFamily from "./components/CreateFamily/CreateFamily";
import Invite from "./components/Invite/Invite";
import UploadMemento from "./components/UploadMemento/UploadMemento";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
  }

  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-family: "Rubik", Arial, Helvetica, sans-serif;
    color: ${props => props.theme.palette.text}
  }

  a {
    text-decoration: none;
  }

  h1, h2, h3 {
    font-family: "Livvic", Arial, Helvetica, sans-serif;
    font-weight: 700;
  }

  h2 {
    font-size: 1.5em;
  }

  button {
    font-family: "Livvic", Arial, Helvetica, sans-serif;
    font-weight: 600;
    border: none;
    letter-spacing: 0.03em;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* * {
    background: #000 !important;
    color: #0f0 !important;
    outline: solid #f00 1px !important;
  } */
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/sidebar" component={Sidebar} />
        <Route path="/create-family" component={CreateFamily} />
        <Route path="/invite" component={Invite} />
        <Route path="/new-memento" component={UploadMemento} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
