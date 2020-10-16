import React from "react";

class FormContribution extends React.Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <span onClick={() => this.props.goBack()} className="icon is-medium">
          <i className="fas fa-lg fa-times-circle"></i>
        </span>
        <h1>What do you want to give?</h1>
        <form className="field has-addons">
          <p className="control">
            <span className="select">
              <select>
                {this.props.project.materials &&
                  this.props.project.materials.map((material) => {
                    return <option>{material.fabric_type}</option>;
                  })}
              </select>
            </span>
          </p>
          <p className="control">
            <input className="input" type="text" placeholder="Amount" />
          </p>
          <p className="control">
            <a className="button is-primary">submit</a>
          </p>
        </form>
      </React.Fragment>
    );
  }
}

export default FormContribution;
