import React from "react";

class FormContribution extends React.Component {
  state = {
    fabric_type: this.props.project.materials[0].fabric_type,
    quantity: "",
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.handleContributionForm(this.state);
    this.props.goBack();
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="bottom-form-container">
          <div>
            <img className="illu-gift" src="/gift-woman.svg" alt="illu-gift" />
          </div>
          <div className="form-container">
            <h3 className="has-text-dark-gray bold">
              What do you want to give?
            </h3>
            <form className="field " onSubmit={this.handleSubmit}>
              <div className="field has-addons">
                <p className="control">
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
                </p>
                <p className="control">
                  <input
                    className="input"
                    name="quantity"
                    type="number"
                    placeholder="Amount"
                    onChange={this.handleChange}
                  />
                </p>
              </div>

              <div class="field is-grouped">
                <p class="control">
                  <a onClick={this.handleSubmit} class="button is-primary">
                    Submit
                  </a>
                </p>
                <p class="control">
                  <a
                    onClick={() => this.props.goBack()}
                    class="button is-light"
                  >
                    Cancel
                  </a>
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
