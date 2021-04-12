import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Layout from "../layout/Layout";
import Add from "./Add";
import Project from "./Project";
import EditProject from "./EditProject";



function Home() {
    return (
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

    );
}

export default Home;
