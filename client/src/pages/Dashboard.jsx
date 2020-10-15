import React from "react";
import Searchbar from "../components/Searchbar";
import ProjectList from "../components/Project/ProjectList";
import apiHandler from "../api/apiHandler";
import HomeMap from "../components/HomeMap";
import ProjectContainer from "../components/Project/ProjectContainer";
import ProfileContainer from "../components/Profile/ProfileContainer";

class Dashboard extends React.Component {
  state = {
    projects: [],
    selectedProject: [],
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

  clickedProject = (projectId) => {
    apiHandler
      .getOne("/api/projects/", projectId)
      .then((apiRes) => {
        this.setState({
          selectedProject: apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  };

  displayRightBlock = () => {
    // conditional logic for rendering right block
    const location = window.location.pathname.toString();

    if (location === "/") {
      return <HomeMap />;
    } else if (location.startsWith("/project")) {
      // console.log(this.state.selectedProject)
      return <ProjectContainer project={this.state.selectedProject} />;
    } else if (location.startsWith("/profile")) {
      return <ProfileContainer />;
    }
  };

  render() {
    return (
      <div className="dashboard-container">
        <div className="left-block">
          <div className="left-grid-container">
            <Searchbar />
            <ProjectList
              projects={this.state.projects}
              currentProject={this.clickedProject}
            />
          </div>
        </div>
        <div className="right-block">{this.displayRightBlock()}</div>
      </div>
    );
  }
}

export default Dashboard;
