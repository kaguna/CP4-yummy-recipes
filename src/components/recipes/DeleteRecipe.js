import React, { Component } from 'react';
import axiosInstance from '../../AxiosInstance'
class DeleteRecipe extends Component {
    constructor(props){
        super(props);

            this.state = { mess: "", error:""}
    }

    deleteRecipeHandler = (event) => {
        event.preventDefault();
        axiosInstance.delete("/category/"+this.props.recipe.category_id+"/recipe/"+this.props.recipe.id)
        .then(response => {
                this.props.parent.setState({mess: response.data.message, error: "",});
                this.props.recipeAfterDelete();
                
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
            
            <div className="modal fade" id={this.props.recipe_id} tabindex = "-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div class="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                            Delete Recipe ({this.props.recipe.recipe_name})
                            <a href="#" className="pull-right" data-dismiss="modal">X</a>
                            </h5>
                        </div>
                        <div className="modal-body">
                            {this.state.error?
                                <div className="alert alert-danger">{this.state.error}</div>: ""}
                            <div className=" col-sm-12">
                                <h4>Are you sure you want to delete recipe <label className="control-label"> {this.props.recipe.recipe_name}?</label></h4>
                            </div>
                        </div>
                                <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-default">
                                        <i class="glyphicon glyphicon-remove"></i> No, Cancel
                                    </button>
                                    <button data-dismiss="modal" type="button" onClick={this.deleteRecipeHandler} className="btn btn-danger">
                                        <i class="glyphicon glyphicon-ok"></i> Yes, Delete
                                    </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DeleteRecipe;
