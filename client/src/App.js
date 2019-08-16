import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from './theme';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';

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

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
