import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";

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
    letter-spacing: 0.01em;
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
