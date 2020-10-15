import React from "react";
import Searchbar from "../components/Searchbar";
import Map from "../components/Map";
import ProjectList from "../components/Project/ProjectList";
import apiHandler from "../api/apiHandler";

class Dashboard extends React.Component {
  state = {
    projects: [],
    clickedProject: null,
  };

  componentDidMount() {
    apiHandler
      .getAll("/api/projects")
      .then((apiRes) => {
        this.setState({
          projects: apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  }

  getClickedProject = (projectId) => {
    console.log(projectId);
    apiHandler
      .getOne("/api/projects/", projectId)
      .then((apiRes) => {
        console.log("project clicked: ", apiRes);
        this.setState({
          clickedProject: apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="dashboard-container">
        <div className="left-block">
          <div className="left-grid-container">
            <Searchbar />
            <ProjectList projects={this.state.projects} oneProject={this.getClickedProject} />
          </div>
        </div>
        <div className="right-block">
          <Map />
        </div>
      </div>
    );
  }
}

export default Dashboard;
