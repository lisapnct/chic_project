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
    fabric_types: [
      'cotton',
      'linen',
      'silk',
      'wool',
      'artificial fibers (polyester, nylon, elastane)'
    ],
  }
  
  handleCheck = () => {
    if(this.state.fabric_types.length === 0) {
      this.props.displayAllProjects();
    } else {
      this.props.handleCheckBoxesClick(this.state.fabric_types);
    }
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
      <div onChange={this.handleCheck} className="check-boxe-fabric">
      {fabric_types.map(elm => <Checkbox label={elm} toggleState={this.toggleState} />)}
      </div>
    </div>
  );
  }
};

export default Searchbar;
