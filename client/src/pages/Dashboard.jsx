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

class Dashboard extends React.Component {
  state = {
    projects: [],
    allProjects: [],
    selectedProject: [],
    userContributions: [],
    store_selected: false,
    currentStoreId: null,
    selectedStoreId: null,
    inputCoordinates: [2.35183, 48.85658], // default Paris coordinates
    fabricFilters: [],
  };

  componentDidMount() {
    this.resetState();
    if (this.props.context.user) this.getUsersContributions();
  }

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
        if(this.state.fabricFilters.length > 0) this.filterByFabricTypes(this.state.fabricFilters);
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
      .then((apiRes) => {
        this.setState({
          userContributions: apiRes.data,
        });
      })
      .catch((err) => console.log(err));
  };

  handleMarkerClick = (storeId) => {
    apiHandler
      .getAllProjects("/api/stores/projects/", storeId)
      .then((apiRes) => {
        this.setState({
          projects: apiRes.data,
          store_selected: true,
          currentStoreId : storeId,
        });
        if(this.state.fabricFilters.length > 0) this.filterByFabricTypes(this.state.fabricFilters);
      })
      .catch((err) => console.log(err));
  };

  filterByFabricTypes = (fabricList) => {
    let projectsArr = [];
    if(!this.state.store_selected) projectsArr = this.state.allProjects;
    else projectsArr = this.state.projects;
    let filteredProjects = [];
    this.setState({fabricFilters: fabricList});
      fabricList.forEach(fabricType => {
        projectsArr.map(project => project.materials.map(material => material.fabric_type === fabricType ? filteredProjects.push(project) : null));
      })
      this.setState({ projects: filteredProjects});
  };

  filterByFabricTypesWhenMarkerClicked = (fabricList) => {
    this.filterByFabricTypes(fabricList);
    if(this.state.projects.length <= 1 && this.state.store_selected) this.handleMarkerClick(this.state.currentStoreId);
  };

  displayProjectList = () => {
    // conditional logic for rendering project list
    const location = this.props.history.location.pathname.toString();
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
        isStoreSelected={this.state.store_selected}
      />
    );
  };

  getInputCoordinates = (coordinates) => {
    console.log(coordinates);
    this.setState({
      inputCoordinates: coordinates,
    });
  };

  render() {
    console.log(this.state.fabricFilters);
    const boxShadow = {
      boxShadow: `25px 47px 100px -49px rgba(0, 0, 0, 0.69)`,
    };
    return (
      <div className="dashboard-container">
        <div className="left-block">
          <div
            className="left-grid-container"
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
                  />
                )}
              />
              <Route path="/profile" component={ListTitle} />
            </Switch>

            {this.displayProjectList()}
          </div>
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
                />
              )}
            />
            <Route path="/profile" component={ProfileContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withUser(Dashboard);
