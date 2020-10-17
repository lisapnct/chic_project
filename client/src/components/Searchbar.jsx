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

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState !== this.state) {
      this.filterByFabric();
    }
  } 

  filterByFabric = () => {
    if(this.state.fabric_types.length === 0) {
      this.props.displayAllProjects();
    } else {
      this.props.filterByFabricType(this.state.fabric_types);
      console.log(this.state.fabric_types);
    }
  }

  handleCheckChanges = (label) => {
    const labelStr = String(label);
    const fabricArr = this.state.fabric_types;
    if(fabricArr.length === 0 || !fabricArr.includes(labelStr)) fabricArr.push(labelStr);
    else {
      for(let i = 0; i < fabricArr.length; i++) {
          if(fabricArr[i] === labelStr) fabricArr.splice(i, 1);
      }
    }
    this.setState({ fabric_types: fabricArr });
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
      {fabric_types.map(elm => <Checkbox key={elm} label={elm} value={elm}  onChange={this.handleCheckChanges} />)}
      </div>
    </div>
  )}
  };
export default Searchbar;
