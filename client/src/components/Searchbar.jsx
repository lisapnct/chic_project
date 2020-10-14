import React from "react";

const Searchbar = () => {
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
    </div>
  );
};

export default Searchbar;
