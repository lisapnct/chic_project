import React from "react";
import Searchbar from "../components/Searchbar";
import ProjectList from "../components/Project/ProjectList";
import apiHandler from "../api/apiHandler";
import HomeMap from "../components/HomeMap";
import ProjectContainer from "../components/Project/ProjectContainer";
import ProfileContainer from "../components/Profile/ProfileContainer";
import { Switch, Route } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";

class Dashboard extends React.Component {
  state = {
    projects: [],
    selectedProject: [],
    userContributions: [],
  };

  componentDidMount() {
    this.resetState();
  }

  resetState = () => {
    apiHandler
      .getAll("/api/projects")
      .then((apiRes) => {
        this.setState({
          projects: apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  };

  getSelectedProject = (projectId) => {
    apiHandler
      .getOne("/api/projects/", projectId)
      .then((apiRes) => {
        this.setState({
          selectedProject: apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  };

  getUsersContributions = () => {
    apiHandler
      .getAllProjects("/api/projects/user/", this.props.context.user._id)
      .then((apiRes) =>
        this.setState({
          userContributions: apiRes.data,
        })
      )
      .catch((err) => console.log(err));
  };

  handleMarkerClick = (storeId) => {
    apiHandler
      .getAllProjects("/api/stores/projects/", storeId)
      .then((apiRes) => {
        this.setState({
          projects: apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  };

  displayProjectList = () => {
    // conditional logic for rendering project list
    const location = window.location.pathname.toString();
    return location.startsWith("/profile") ? (
      <ProjectList
        projects={this.state.userContributions}
        handleResetClick={this.resetState}
        currentProject={this.getSelectedProject}
      />
    ) : (
      <ProjectList
        handleResetClick={this.resetState}
        projects={this.state.projects}
        currentProject={this.getSelectedProject}
      />
    );
  };

  displayRightBlock = () => {
    // conditional logic for rendering right block
    const location = window.location.pathname.toString();
    if (location === "/") {
      return <HomeMap handleMarkClic={this.handleMarkerClick} />;
    } else if (location.startsWith("/project")) {
      return <ProjectContainer project={this.state.selectedProject} />;
    } else if (location.startsWith("/profile")) {
      // this.getUsersContributions();
      return <ProfileContainer />;
    }
  };

  render() {
    console.log("render");
    console.log(this.props);
    return (
      <div className="dashboard-container">
        <div className="left-block">
          <div className="left-grid-container">
            <Searchbar />
            {this.displayProjectList()}
          </div>
        </div>

        <div className="right-block">
          <Switch>
            <Route exact path="/" component={HomeMap} />
            <Route path="/project/:id" render={props => <ProjectContainer  {...props} project={this.state.selectedProject} />} />
            <Route path="/profile" component={ProfileContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withUser(Dashboard);
