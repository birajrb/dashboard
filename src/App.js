import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
    <Router>
      <ThemeProvider theme={theme}>
        <Layout>
          <Switch>
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
