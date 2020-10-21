import React from "react";
import { Switch, Route } from "react-router-dom";
import FormSignin from "../components/Forms/FormSignin";
import FormSignup from "../components/Forms/FormSignup";

import "../styles/Home.scss";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="fullscreen-container">
          <div className="blocks-container">
            <div className="left block-home">
              <h1 className="title is-1">A second life for your clothes!</h1>
              <h2 className="subtitle colored is-4">
                Give materials, help creators, get rewards.
              </h2>
              <p>
                Tired of your old clothes getting dust in your closet? <br/>
                Why not get rid of them and help your local disigners?! <br/>
                Join the CHIIC project and make the world a slightly more fair, stylich and ecofriendly place! 
              </p>
            </div>

            <div className="right block-home">
              <Switch>
                <Route exact path="/signup" component={FormSignup} />
                <Route exact path="/home" component={FormSignup} />
                <Route exact path="/signin" component={FormSignin} />
              </Switch>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
