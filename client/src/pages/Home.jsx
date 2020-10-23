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
              <h1 className="title is-1">A second life for your clothes!</h1>
              <h2 className="subtitle colored is-4">
                Give materials, help creators, get rewards.
              </h2>
              <p className="has-text-grey">
                Tired of your old clothes getting dust in your closet? <br />
                Why don't your get rid of them and help local creators?! <br />
                Join the chiic project and make the world a slightly fairer,
                elegant and ecofriendly place!
              </p>
              <br/>
              <span className="has-text-grey-light">
                An app developed with <i className="fas fa-heart"></i> by François
                V. and Lisa P. (Ironhack students)
              </span>
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
