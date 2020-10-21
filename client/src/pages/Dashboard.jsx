import React from "react";
import Searchbar from "../components/Searchbar";
import ProjectList from "../components/Project/ProjectList";
import apiHandler from "../api/apiHandler";
import HomeMap from "../components/HomeMap";
import ListTitle from "../components/Profile/ListTitle";
import ProjectContainer from "../components/Project/ProjectContainer";
import ProfileContainer from "../components/Profile/ProfileContainer";
import { Switch, Route } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import ContributionsList from "../components/Profile/ContributionList";

class Dashboard extends React.Component {
  state = {
    projects: [],
    allProjects: [],
    selectedProject: [],
    selectedProjectStoreInfo: [],
    userContributions: [],
    store_selected: false,
    currentStoreId: null,
    selectedStoreId: null,
    inputCoordinates: [2.3968998, 48.8651136], // default Paris coordinates 20th arrondissement
    fabricFilters: [],
  };

  componentDidMount() {
    this.resetState();
    if (this.props.context.user) this.getUsersContributions();
  }

  // componentDidUpdate = () => {

  // }

  resetState = () => {
    apiHandler
      .getAll("/api/projects")
      .then((apiRes) => {
        this.setState({
          projects: apiRes.data,
          allProjects: apiRes.data,
          store_selected: false,
          currentStoreId: null,
        });
        if (this.state.fabricFilters.length > 0)
          this.filterByFabricTypes(this.state.fabricFilters);
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
        this.getSelectedProjectStore();
      })
      .catch((err) => console.log(err));
  };

  getSelectedProjectStore = () => {
    apiHandler
      .getOne("/api/stores/", this.state.selectedProject.store)
      .then((apiRes) => {
        this.setState({
          selectedProjectStoreInfo: apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  };

  getUsersContributions = () => {
    apiHandler
      .getAllProjects("/api/projects/user")
      .then((apiRes) => {
        this.setState({
          userContributions: apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  };

  handleMarkerClick = (storeId) => {
    // console.log(storeId);
    apiHandler
      .getAllProjects("/api/projects/stores/" + storeId)
      .then((apiRes) => {
        this.setState({
          projects: apiRes.data,
          store_selected: true,
          currentStoreId: storeId,
        });
        if (this.state.fabricFilters.length > 0)
          this.filterByFabricTypes(this.state.fabricFilters);
      })
      .catch((err) => console.log(err));
  };

  filterByFabricTypes = (fabricList) => {
    let projectsArr = [];

    if (!this.state.store_selected) projectsArr = this.state.allProjects;
    else projectsArr = this.state.projects;
    let filteredProjects = [];
    this.setState({ fabricFilters: fabricList });
    fabricList.forEach((fabricType) => {
      projectsArr.map((project) =>
        project.materials.map((material) =>
          material.fabric_type === fabricType &&
          !filteredProjects.some((elm) => elm._id === project._id)
            ? filteredProjects.push(project)
            : null
        )
      );
    });
    this.setState({ projects: filteredProjects }); // HEHEHE
  };

  filterByFabricTypesWhenMarkerClicked = (fabricList) => {
    this.filterByFabricTypes(fabricList);
    if (this.state.projects.length <= 1 && this.state.store_selected)
      this.handleMarkerClick(this.state.currentStoreId);
  };

  displayProjectList = () => {
    // conditional logic for rendering project list
    const location = this.props.history.location.pathname.toString();
    return location.startsWith("/profile") ? (
      // render contrib list with this.state.userContrib
      <ContributionsList projects={this.state.userContributions} />
    ) : (
      <ProjectList
        projects={this.state.projects}
        currentProject={this.getSelectedProject}
      />
    );
  };

  getInputCoordinates = (coordinates) => {
    this.setState({
      inputCoordinates: coordinates,
    });
  };

  // project contribution form handler
  handleContributionSubmit = (data) => {
    let id;
    this.state.selectedProject.length === 0
      ? (id = this.props.match.params.id)
      : (id = this.state.selectedProject._id);
    // Update project
    apiHandler
      .updateOne(`/api/projects/${id}/contributions`, data)
      .then((apiRes) => {
        this.setState({ selectedProject: apiRes.data });
      })
      .catch((err) => console.log());
    apiHandler
      .updateOne(`/api/users/paillettes`, data)
      .then((apiRes) => {
        this.props.context.setUser(apiRes.data);
      })
      .catch((err) => console.log());
  };

  render() {
    const boxShadow = {
      boxShadow: `25px 47px 100px -49px rgba(0, 0, 0, 0.4)`,
    };
    return (
      <div className="dashboard-container">
        <div
          className="left-block"
          style={
            this.props.history.location.pathname === "/" ? boxShadow : null
          }
        >
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Searchbar
                  {...props}
                  filterByFabricType={this.filterByFabricTypesWhenMarkerClicked}
                  displayAllProjects={this.resetState}
                  isStoreSelected={this.state.store_selected}
                  sendCoordinates={this.getInputCoordinates}
                  projectsNumber={this.state.projects.length}
                  handleResetClick={this.resetState}
                />
              )}
            />
            <Route
              path="/project/:id"
              render={(props) => (
                <Searchbar
                  {...props}
                  filterByFabricType={this.filterByFabricTypesWhenMarkerClicked}
                  displayAllProjects={this.resetState}
                  isStoreSelected={this.state.store_selected}
                  projectsNumber={this.state.projects.length}
                  handleResetClick={this.resetState}
                />
              )}
            />
            <Route path="/profile" component={ListTitle} />
          </Switch>
          {this.displayProjectList()}
        </div>

        <div className="right-block">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <HomeMap
                  {...props}
                  handleMarkClic={this.handleMarkerClick}
                  searchInput={this.state.inputCoordinates}
                />
              )}
            />
            <Route
              path="/project/:id"
              render={(props) => (
                <ProjectContainer
                  {...props}
                  project={this.state.selectedProject}
                  handleContributionFormSubmit={this.handleContributionSubmit}
                  store={this.state.selectedProjectStoreInfo}
                />
              )}
            />
            <Route
              path="/profile"
              render={(props) => <ProfileContainer {...props} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withUser(Dashboard);
