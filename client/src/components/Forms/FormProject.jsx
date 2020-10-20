import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';

class FormProject extends Component {
    state = {
        availableStores : [],
        availableFabric : ["cotton", "linen", "silk", "wool", "artificial fibers"],
    }
    componentDidMount = () => {
        this.getAllStores()
    }

    getAllStores = () => {
        apiHandler
            .getAll('/api/stores')
            .then((apiRes) => this.setState({availableStores : apiRes.data}))
            .catch(err => console.log(err));
    }

    handleChangeObj = (evt, elm) => {
        this.props.handleChangeMaterials({ 'fabric_type': evt.target.name, 'required_quantity': evt.target.value } )
    }

    render() {
        // console.log();
        return (
            <div>
                <div className="form-container">
                    <h3 className="has-text-dark-gray bold">
                    How can we help you achieve your project ?
                    </h3>
                    <form className="field " onSubmit={this.props.handleFormSubmit}>
                    <label className="label">Description picture</label>
                    <div className="file is-small">
                    <label className="file-label">
                        <input
                        className="file-input"
                        type="file"
                        name="image"
                        onChange={this.props.handleChange}
                        />
                        <span className="file-cta">
                        <span className="file-icon">
                            <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">Choose a file…</span>
                        </span>
                    </label>
                    </div>
                    <label className="label">Name</label>  
                        <p className="control">
                            <input
                                className="input"
                                name="name"
                                type="string"
                                placeholder="Name "
                                onChange={this.props.handleChange}
                            />
                        </p>
                    
                    <label className="label">Description</label> 
                        <p className="control">
                            <textarea
                                className="input"
                                name="description"
                                type="text"
                                placeholder="Description"
                                onChange={this.props.handleChange}
                            />
                        </p>
                         
                    <label className="label">Deadline </label>
                        <p className="control">
                            <input
                                name="deadline"
                                type="date"
                                onChange={this.props.handleChange}
                            />
                        </p>
                    
                    <label className="label">Store </label>
                    <div className="field has-addons">
                        <div className="control">
                        <div className="select">
                            <select name="store" onChange={this.props.handleChange}>
                            {this.state.availableStores &&
                                this.state.availableStores.map((str) => {
                                return (
                                    <option key={str.name} value={str._id}>
                                    {str.name}
                                    </option>
                                );
                                })}
                            </select>
                        </div>
                        </div>
                    </div>

                    <label className="label">Materials </label>
                    
                    {this.state.availableFabric && this.state.availableFabric.map(elm => {
                        return (
                            <div className="field" key={elm} name={elm}>
                            <label className="label">{elm}</label> 
                            Required_quantity
                            <input
                            className="input"
                            name={elm}
                            type="number"
                            placeholder="Required_quantity"
                            onChange={this.handleChangeObj}
                            />
                            </div>  
                        )
                    })};
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="field is-grouped">
                        <p className="control">
                        <button className="button is-primary">Submit</button>
                        </p>
                        <p className="control">
                        <a
                            // onClick={() => this.props.goBack()}
                            className="button is-light"
                        >
                            Cancel
                        </a>
                        </p>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default FormProject