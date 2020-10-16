import React, { Component } from 'react';

class Checkbox extends Component {
      state = {
        isChecked: false,
        fabricType: this.props.label,
      };

    toggleChange = () => {
      this.setState({
        isChecked: !this.state.isChecked,
      });
    }

    render() {
      return (
        <label>
          <input 
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.toggleChange}
            onClick={this.props.toggleState}
          />
          {this.props.label}
        </label>
      );
    }
  }
  

  export default Checkbox;