import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
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
        <Route exact path="/project/:id" component={Dashboard} /> 
        <ProtectedRoute exact path="/profile" component={Dashboard} />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
