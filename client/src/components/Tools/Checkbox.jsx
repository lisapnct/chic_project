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

  render() {
    return (
      <label className="checkbox">
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.toggleChange}
        />
        {this.props.label}
      </label>
    );
  }
}

export default Checkbox;
