import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProject from "./pages/CreateProject";
import "./styles/Dashboard.scss";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/signin" component={Home} />
        <Route exact path="/signup" component={Home} />
        <ProtectedRoute exact path="/create/project" component={CreateProject} />
        <ProtectedRoute exact path="/" component={Dashboard} />
        <ProtectedRoute exact path="/project/:id" component={Dashboard} />
        <ProtectedRoute exact path="/profile" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
