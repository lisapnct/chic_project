import React from "react";

class FormContribution extends React.Component {
  state = {
    fabric_type: this.props.project.materials[0].fabric_type,
    quantity: "",
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.handleContributionForm(this.state);
    this.props.contributionDone();
    this.props.goBack();
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    let currentMat = this.props.project.materials.filter(elm => elm.fabric_type === this.state.fabric_type)
    let max;
    if(this.props.project) max = currentMat[0].required_quantity - currentMat[0].collected_quantity
    console.log(max);
    return (
      <React.Fragment>
        <div className="bottom-form-container">
          <div>
            <img className="illu-gift" src="/gift-woman.svg" alt="illu-gift" />
          </div>
          <div className="form-container">
            <h3 className="has-text-dark bold">
              What do you want to give?
            </h3>
            <form className="field " onSubmit={this.handleSubmit}>
              <div className="field has-addons">
                <div className="control">
                  <div className="select">
                    <select name="fabric_type" onChange={this.handleChange}>
                      {this.props.project.materials &&
                        this.props.project.materials.map((material) => {
                          return (
                            <option key={material.fabric_type}>
                              {material.fabric_type}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <p className="control">
                  <input
                    className="input"
                    name="quantity"
                    max={max}
                    type="number"
                    placeholder="amount"
                    onChange={this.handleChange}
                    min={1}
                    required
                  />
                </p>
              </div>

              <div className="field is-grouped">
                <p className="control">
                  <button className="button is-primary">Submit</button>
                </p>
                <p className="control">
                  <span
                    onClick={() => this.props.goBack()}
                    className="button is-light"
                  >
                    Cancel
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FormContribution;
