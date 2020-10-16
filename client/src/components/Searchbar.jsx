import React, { Component } from 'react';
import Checkbox from './Tools/Checkbox';

const fabric_types = [
  'cotton',
   'linen',
   'silk',
   'wool',
   'artificial fibers (polyester, nylon, elastane)'
  ];

 class Searchbar extends Component {
  state = {
    fabric_types: [],
  }
  

  filterByFabric = () => {
    if(this.state.fabric_types.length === 0) {
      this.props.displayAllProjects();
    } else {
      this.props.displayByCheckBoxes(this.state.fabric_types);
    }
  }

  handleCheckChanges = (label) => {
    console.log(label);
  }
  
  render() {
  return (
    <div className="left-block-top">
      <div className="searchbar">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input className="input" type="text" placeholder="Find a project" />
          </div>
          <div className="control">
            <div className="button is-primary">Search</div>
          </div>
        </div>
      </div>
      <div  className="check-boxe-fabric">
      {fabric_types.map(elm => <Checkbox label={elm} value={elm}  onChange={this.handleCheckChanges} />)}
      </div>
    </div>
  );
  }
};

export default Searchbar;
