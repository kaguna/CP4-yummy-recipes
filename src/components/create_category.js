import React, { Component } from 'react';
import axios from 'axios'
class Create_category extends Component {
    constructor(props){
        super(props);
        this.state = { category_name: ""}
    }

    inputHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    create_category_handler = (event) => {
        const {category_name} = this.state;
        event.preventDefault();
        const header = {headers:{'x-access-token': window.localStorage.getItem('token')},
            content_type: 'application/json'};
        if (!header)
            window.location.href='/login';
        axios.post("http://127.0.0.1:5000/categories/", {category_name}, header)
            .then(response => {
                this.setState({mess: response.data.message, error: "",});
                console.log(response.data)
            })
            .catch(error => {
                if (error.response) {
                    this.setState({error: error.response.data.message, mess: ""});
                    console.log(error.response.data.message)
                } else if (error.request) {
                    console.log("ERRROR")
                }
            });
    };
    render() {
        return (
            <div className="modal fade" id="createcategory" tabindex = "-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div class="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Create category</h5>
                        </div>
                        <div className="modal-body">
                            {this.state.mess?
                            <div className="alert alert-success">{this.state.mess}</div>: ""}
                            {this.state.error?
                                <div className="alert alert-danger">{this.state.error}</div>: ""}
                            <form className="form-horizontal" onSubmit={this.create_category_handler}>
                                <div className="form-group">
                                    <label className="control-label col-sm-3">Category Name:</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="category_name" className="form-control" placeholder="Enter Category name"
                                               value={this.state.category_name} onChange={this.inputHandler}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">
                                        <i class="glyphicon glyphicon-plus"></i> Add Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Create_category;
