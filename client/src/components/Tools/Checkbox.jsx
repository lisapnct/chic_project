import React, { Component } from "react";

class Checkbox extends Component {
  state = {
    isChecked: false,
  };

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    this.props.onChange(this.props.label);
  };

  toggleColor = (event) => {
    event.target.parentNode.classList.toggle("is-info");
  };

  render() {
    return (
      <label className="checkbox tag">
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.toggleChange}
          onClick={this.toggleColor}
        />
        {this.props.label}
      </label>
    );
  }
}

export default Checkbox;
