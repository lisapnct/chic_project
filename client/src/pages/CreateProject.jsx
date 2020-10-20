import React, { Component } from 'react';
import FormProject from '../components/Forms/FormProject';
import { withUser } from "../components/Auth/withUser";
import apiHandler from '../api/apiHandler';

class CreateProject extends Component {
    state = {
        creator: "",
        image: null,
        name: "",
        description: "",
        deadline: "", 
        contributors: [],
        materials: []
    }

    componentDidMount = () => {
        if(this.props.context.user) this.setState({ creator: this.props.context.user._id});
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
        console.log('change');
    }

    handleChangeMaterials = (newVal) => {
        const materials = [];
        materials.push(newVal)
        console.log(newVal);
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('submitted');
    }

    render() {
        // console.log(this.state);
        return (
            <div>
                <h1>Create a project here</h1>
                <FormProject handleChange={this.handleChange} handleChangeMaterials={this.handleChangeMaterials} handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default withUser(CreateProject);