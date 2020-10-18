import React from "react";

class FormContribution extends React.Component {
  state = {
    fabric_type: this.props.project.materials[0].fabric_type,
    quantity: "",
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.handleContributionForm(this.state)
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name] : evt.target.value });
 }

  render() {
    return (
      <React.Fragment>
        <span onClick={() => this.props.goBack()}>
          <div className="delete is-large"></div>
        </span>
        <h1>What do you want to give?</h1>
        <form className="field has-addons" onSubmit={this.handleSubmit}>
          <p className="control">
            <span className="select">
              <select name="fabric_type" onChange={this.handleChange}>
                {this.props.project.materials &&
                  this.props.project.materials.map((material) => {
                    return <option key={material.fabric_type}>{material.fabric_type}</option>;
                  })}
              </select>
            </span>
          </p>
          <p className="control">
            <input className="input" name="quantity" type="text" placeholder="Amount" onChange={this.handleChange}/>
          </p>
          <p className="control">
            <button className="button is-primary">submit</button>
          </p>
        </form>
      </React.Fragment>
    );
  }
}

export default FormContribution;
