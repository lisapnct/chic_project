import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProject from "./pages/CreateProject";
import "./styles/Dashboard.scss";

function App() {
  const screenWidth = window.screen.availWidth;
  console.log(screenWidth);
  return (
    <div className="App">
      {screenWidth >= 1024 ? (
        <>
          <NavMain />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/signin" component={Home} />
            <Route exact path="/signup" component={Home} />
            <ProtectedRoute
              exact
              path="/create/project"
              component={CreateProject}
            />
            <ProtectedRoute exact path="/" component={Dashboard} />
            <ProtectedRoute exact path="/project/:id" component={Dashboard} />
            <ProtectedRoute exact path="/profile" component={Dashboard} />
          </Switch>
        </>
      ) : (
        <>
          <div className="alert-container">
            <img
              className="small-screen-illu"
              src="/small-screen-illu.svg"
              alt="small-screen"
            />
            <div className=" alert-small-screen notification is-light">
              <p>
                <i class="fas fa-lg has-text-primary fa-exclamation-circle"></i>
                 
                <span className="has-text-primary">
                   Your screen seems too small...
                </span>
                <br />
                <br />
                Sorry, for now <b>chiic</b> is only available on{" "}
                <b>large screens. </b>
                Please use a laptop or a tablet to enter.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
