import React, { Component } from 'react';
import axiosInstance from '../../AxiosInstance'
class EditCategory extends Component {
    constructor(props){
        super(props);
        this.state = {error: ""};
    }
    inputHandler = (event) => {
        event.preventDefault();
        let {name, value} = event.target;
        this.setState({[name]: value});
    };

    editCategoryHandler = (event) => {
        event.preventDefault();
        const {category_name} = this.state;
        axiosInstance.put("/category/"+ this.props.category.id, {category_name})
            .then(response => {
                this.props.parent.setState({mess: response.data.message, error: ""});
                this.props.categoryAfterEdit();
               
                
            })
            .catch(error => {
                if (error.response) {
                    this.setState({error: error.response.data.message, mess: ""});
                    console.log(error.response.data.message)
                } else if (error.request) {
                    this.setState({error:"Can't connect to the server.Please check your connection and try again.", mess: ""});
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
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit category ({this.props.category.category_name})</h5>
                        </div>
                        <div className="modal-body">
                            {this.state.error?
                                <div className="alert alert-danger">{this.state.error}</div>: ""}
                            
                                <div className="form-group">
                                    <label className="control-label col-sm-3">New Category Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" name="category_name" className="form-control"
                                               placeholder="Enter New Category name"
                                               defaultValue={this.props.category.category_name} onChange={this.inputHandler}/>
                                    </div>
                                </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-dismiss="modal">Close</button>
                                    <button  className="btn btn-primary" data-dismiss="modal" onClick={this.editCategoryHandler}>
                                        <i class="glyphicon glyphicon-edit"></i> Edit Category
                                    </button>
                                </div>
                            
                    </div>
                </div>
            </div>
        );
    }
}
export default EditCategory;
