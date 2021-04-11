import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout/Layout";
import Add from "./pages/Add";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/add">
              <Add />
            </Route>
            <Route exact path="/project">
              <Project />
            </Route>
            <Route path="/project/:projectId/edit">
              <EditProject />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
