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
            <h1>This project is {this.getValue()}% completed</h1>
            <progress
              className="progress is-primary is-medium"
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
