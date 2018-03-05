import React, { Component } from 'react';
import axios from 'axios'
class EditCategory extends Component {
    constructor(props){
        super(props);
        if(props.category){
            this.state=props.category
        }else{
            this.state = { category_name: ""}
        }
    }

    inputHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    edit_category_handler = (event) => {
        const {category_name} = this.state;
        event.preventDefault();
        const header = {headers:{'x-access-token': window.localStorage.getItem('token')},
            content_type: 'application/json'};
        axios.put("http://127.0.0.1:5000/category/"+ this.props.category.id, {category_name}, header)
            .then(response => {
                this.setState({mess: response.data.message, error: "",});
                this.props.category_after_edit();
                
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
            
            <div className="modal fade" id={this.props.category_id} tabindex = "-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div class="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit category ({this.state.category_name})</h5>
                        </div>
                        <div className="modal-body">
                            {this.state.mess?
                                <div className="alert alert-success">{this.state.mess}</div>: ""}
                            {this.state.error?
                                <div className="alert alert-danger">{this.state.error}</div>: ""}
                            <form className="form-horizontal" onSubmit={this.edit_category_handler}>
                                <div className="form-group">
                                    <label className="control-label col-sm-3">New Category Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" name="category_name" className="form-control"
                                               placeholder="Enter New Category name"
                                               value={this.state.category_name} onChange={this.inputHandler}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">
                                        <i class="glyphicon glyphicon-edit"></i> Edit Category
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
export default EditCategory;
