import React from "react";

class Progress extends React.Component {
  getValue = () => {
    let max = 0;
    let qt = 0;
    this.props.materials.map((material) => {
      max += material.required_quantity;
      qt += material.collected_quantity;
      return (max, qt)
    });
    let value = (qt / max) * 100;
    return value.toFixed();
  };

  render() {
    return (
      <div>
        {this.props.materials && (
          <React.Fragment>
            <h3>This project is {this.getValue()}% completed</h3>
            <progress
              className="progress is-primary"
              value={this.getValue()}
              max="100"
            ></progress>
          </React.Fragment>
        )}
      </div>
    );
  }
}


export default Progress;
