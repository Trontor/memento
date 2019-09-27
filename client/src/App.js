import { LeftColumn, Main, SiteGrid } from "ui/Layout";
import React, { useState } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import AcceptInvite from "components/AcceptInvite/AcceptInvite";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import CreateFamily from "./components/CreateFamily/CreateFamily";
import Dashboard from "./components/Dashboard/Dashboard";
import FamilyGroup from "./components/FamilyGroup/FamilyGroup";
import FamilyGroupSettings from "./components/FamilyGroupSettings/FamilyGroupSettings";
import Hamburger from "./components/Sidebar/Hamburger";
import Invite from "./components/Invite/Invite";
import InviteCode from "./components/AcceptInvite/InviteCode";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";
import Signup from "./components/Signup/Signup";
import UploadMemento from "./components/UploadMemento/UploadMemento";
import UserProfile from "./components/UserProfile/UserProfile";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
  /* Reset styles */
  html {
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
  }

  body {
    min-height: 100%;
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-family: "Rubik", Arial, Helvetica, sans-serif;
    color: ${props => props.theme.palette.text};
    background-color: ${props => props.theme.palette.background};
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
    background-color: ${props => props.theme.palette.background};

    &:focus {
      outline: none;
    }
  }

  input {
    background-color: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* This code is used for debuggging */
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
    component: Dashboard,
  },
  {
    name: "create-family",
    component: CreateFamily,
  },
  {
    name: "invite/",
    component: Invite,
    exact: true,
  },
  {
    name: "invite/accept/",
    component: InviteCode,
    exact: true,
  },
  {
    name: "invite/accept/:inviteId",
    component: AcceptInvite,
  },
  {
    name: "family/:id/new",
    component: UploadMemento,
    exact: true,
  },
  {
    name: "settings",
    component: Settings,
  },
  {
    name: "family/:id/",
    component: FamilyGroup,
    exact: true,
  },
  {
    name: "family/:id/settings",
    component: FamilyGroupSettings,
  },
  {
    name: "bookmarks",
    component: Bookmarks,
  },
  {
    name: "profile",
    component: UserProfile,
  },
];

function App() {
  const authenticatedPaths = authenticatedRoutes.map(route => "/" + route.name);

  //Toggle sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route paths={authenticatedPaths}>
            <SiteGrid>
              <LeftColumn>
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </LeftColumn>
              <Main>
                <Hamburger
                  sidebarOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                {authenticatedRoutes.map(route => (
                  <PrivateRoute
                    key={route.name}
                    path={`/${route.name}`}
                    exact={route.exact}
                    component={route.component}
                  />
                ))}
              </Main>
            </SiteGrid>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
