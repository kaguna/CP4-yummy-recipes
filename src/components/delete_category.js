import React, { Component } from 'react';
import axios from 'axios'
class DeleteCategory extends Component {
    constructor(props){
        super(props);

            this.state = { mess: "", error:""}
    }

    delete_category_handler = (event) => {
        event.preventDefault();
        const header = {headers:{'x-access-token': window.localStorage.getItem('token')},
            content_type: 'application/json'};
        axios.delete("http://127.0.0.1:5000/category/"+ this.props.category.id, header)
        .then(response => {
                this.props.parent.setState({mess: response.data.message, error: "",});
                this.props.category_after_delete();
                
            })
            .catch(error => {
                if (error.response) {
                    this.setState({error: error.response.data.message, mess: ""});
                    console.log(error.response.data.message)
                } else if (error.request) {
                    console.log("ERROR")
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
                            <h5 className="modal-title" id="exampleModalLongTitle">
                            Delete category ({this.props.category.category_name})
                            <a href="#" className="pull-right" data-dismiss="modal">X</a>
                            </h5>
                        </div>
                        <div className="modal-body">
                            {this.state.error?
                                <div className="alert alert-danger">{this.state.error}</div>: ""}
                            <div className=" col-sm-12">
                                <h4>Are you sure you want to delete category <label className="control-label"> {this.props.category.category_name}?</label></h4>
                            </div>
                        </div>
                                <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-default">
                                        <i class="glyphicon glyphicon-remove"></i> No, Cancel
                                    </button>
                                    <button data-dismiss="modal" type="button" onClick={this.delete_category_handler} className="btn btn-danger">
                                        <i class="glyphicon glyphicon-ok"></i> Yes, Delete
                                    </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DeleteCategory;
