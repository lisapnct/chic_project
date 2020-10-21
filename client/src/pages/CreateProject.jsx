import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import FormProject from '../components/Forms/FormProject';
import { withUser } from "../components/Auth/withUser";
import apiHandler from '../api/apiHandler';

const materialsList = [];

class CreateProject extends Component {
    state = {
        creator: "",
        image: null,
        name: "",
        description: "",
        deadline: "", 
        contributors: [],
        materials: [],
        store: "",
    }

    componentDidMount = () => {
        if(this.props.context.user) this.setState({ creator: this.props.context.user._id});
        apiHandler
            .getAll('/api/stores')
            .then((apiRes) => this.setState({store : apiRes.data[0]._id}))
            .catch(err => console.log(err));
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleChangeMaterials = (newVal) => {
        if (materialsList.length === 0 || !materialsList.some(elm => elm.fabric_type === newVal.fabric_type)) materialsList.push(newVal);
        else {
            for (let i = 0; i < materialsList.length; i++) {
                if (materialsList[i].fabric_type === newVal.fabric_type) {
                    materialsList.splice(i, 1);
                    materialsList.push(newVal);
                }
            }
        }
        this.setState({ materials : materialsList })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        apiHandler
            .createOne('/api/projects', this.state)
            .then(apiRes => console.log(apiRes))
            .catch(err => console.log(err));
        this.props.history.push("/")
    }

    render() {
        // console.log(this.state);
        return (
            <div>
                <h1>Create a project here</h1>
                <FormProject handleChange={this.handleChange} handleChangeMaterials={this.handleChangeMaterials} handleFormSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default withRouter(withUser(CreateProject));