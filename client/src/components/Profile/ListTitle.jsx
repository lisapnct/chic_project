import React from "react";
import { withUser } from "../Auth/withUser";

class ListTitle extends React.Component {
  state = {
    view: "contributions",
  };

  handleClick = (event) => {
    this.props.handleListBtn(event.target.value);
    this.setState({
      view: event.target.value,
    });
  };

  render() {
    return (
      <div className="left-block-top">
        <div className="profile-list-title">
          <button
            value="contributions"
            onClick={this.handleClick}
            className={
              this.state.view === "contributions"
                ? "button is-small is-primary"
                : "button is-light is-small"
            }
          >
            my contributions
          </button>
          {this.props.context.user.role === "designer" && (
            <button
              value="projects"
              onClick={this.handleClick}
              className={
                this.state.view === "projects"
                  ? "button is-small is-primary"
                  : "button is-light is-small"
              }
            >
              my projects
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default withUser(ListTitle);
