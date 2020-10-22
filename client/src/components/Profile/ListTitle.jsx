import React from "react";
import { withUser } from "../Auth/withUser";

class ListTitle extends React.Component {
  handleClick = (event) => {
    this.props.handleListBtn(event.target.value);
  };

  render() {
    return (
      <div className="left-block-top">
        <div className="profile-list-title">
          <button
            value="contributions"
            onClick={this.handleClick}
            className="button"
          >
            my contributions
          </button>
          {this.props.context.user.role === "designer" && (
            <button
              value="projects"
              onClick={this.handleClick}
              className="button"
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
