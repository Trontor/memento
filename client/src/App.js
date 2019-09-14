import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateFamily from "./components/CreateFamily/CreateFamily";
import Invite from "./components/Invite/Invite";
import Settings from "./components/Settings/Settings";
import UploadMemento from "./components/UploadMemento/UploadMemento";
import Sidebar from "components/Sidebar/Sidebar";

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
    color: ${props => props.theme.palette.text};
    background-color: white;

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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("AUTH-TOKEN") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const authenticatedRoutes = [
  {
    name: "dashboard",
    component: Dashboard
  },
  {
    name: "create-family",
    component: CreateFamily
  },
  {
    name: "invite",
    component: Invite
  },
  {
    name: "new-memento",
    component: UploadMemento
  }
];

function App() {
  const authenticatedPaths = authenticatedRoutes.map(route => "/" + route.name);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path={authenticatedPaths}
          render={() => (
            <div style={{ display: "flex", height: "100%" }}>
              <Sidebar />
              <div style={{ flex: 1 }}>
                {authenticatedRoutes.map(route => (
                  <PrivateRoute
                    path={`/${route.name}`}
                    component={route.component}
                  />
                ))}
              </div>
            </div>
          )}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
