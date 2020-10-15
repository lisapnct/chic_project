import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import "./styles/Dashboard.scss";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/project/:id" component={Project} /> 
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
