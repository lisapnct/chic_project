import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";

class FormProject extends Component {
  state = {
    availableStores: [],
    availableFabric: ["cotton", "linen", "silk", "wool", "artificial fibers"],
  };
  componentDidMount = () => {
    this.getAllStores();
  };

  getAllStores = () => {
    apiHandler
      .getAll("/api/stores")
      .then((apiRes) => this.setState({ availableStores: apiRes.data }))
      .catch((err) => console.log(err));
  };

  handleChangeObj = (evt, elm) => {
    this.props.handleChangeMaterials({
      fabric_type: evt.target.name,
      required_quantity: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    this.props.handleFormSubmit();
  };

  render() {
    // console.log();
    return (
      <div className="form-project-container">
        <h1 className="bold title is-3">New project</h1>
        <form
          className="project-form field "
          onSubmit={this.props.handleFormSubmit}
        >
          <div className="top-project-form">
            {/* NAME OF THE PROJECT */}
            <div className="input-name">
              <label className="label">Name *</label>
              <p className="control">
                <input
                  className="input"
                  name="name"
                  type="string"
                  placeholder="Name "
                  onChange={this.props.handleChange}
                  required
                />
              </p>
            </div>
            {/* SELECT STORE */}
            <div className="select-store">
              <label className="label">Store * </label>
              <div className="field has-addons">
                <div className="control">
                  <div className="select">
                    <select
                      name="store"
                      onChange={this.props.handleChange}
                      required
                    >
                      {this.state.availableStores &&
                        this.state.availableStores.map((str) => {
                          return (
                            <option key={str.name} value={str._id}>
                              {str.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* DEADLINE */}
            <div className="input-deadline">
              <label className="label">Deadline *</label>
              <p className="control">
                <input
                  className="input"
                  name="deadline"
                  type="date"
                  onChange={this.props.handleChange}
                  required
                />
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="label">Description *</label>
            <p className="control">
              <textarea
                className="textarea"
                name="description"
                type="text"
                placeholder="Describe your project in a few words..."
                onChange={this.props.handleChange}
                required
              />
            </p>
          </div>

          {/* MATERIALS NEEDED */}
          <div className="materials-block">
            <label className="label">Materials needed * </label>
            <div className="materials-container">
              {this.state.availableFabric &&
                this.state.availableFabric.map((elm) => {
                  return (
                    <div className="field material-item" key={elm} name={elm}>
                      <label className="label is-small has-text-grey">
                        {elm}
                      </label>
                      <input
                        className="input"
                        name={elm}
                        type="number"
                        placeholder="1"
                        min={0}
                        onChange={this.handleChangeObj}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          {/* PROJECT IMAGE */}

          <div className="input-image">
            <label className="label">Image</label>
            <div class="file has-name">
              <label class="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="image"
                  onChange={this.props.handleChange}
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Choose a file…</span>
                </span>
                {this.props.projectImage && (
                  <span class="file-name">{this.props.projectImage}</span>
                )}
              </label>
            </div>
          </div>

          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <Link to="/">
                <div className="button is-light">Cancel</div>
              </Link>
            </div>
            <div className="control">
              <button className="button is-primary">Create</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default FormProject;
