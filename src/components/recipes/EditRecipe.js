import React, { Component } from 'react';
import axiosInstance from '../../AxiosInstance'
class EditRecipe extends Component {
    constructor(props){
        super(props);
        this.state = {recipe_name:"", error: ""};
    }
    inputHandler = (event) => {
        event.preventDefault();
        let {name, value} = event.target;
        this.setState({[name]: value});
    };

    editRecipeHandler = (event) => {
        event.preventDefault();
        const {recipe_name} = this.state;
        const header = {headers:{'x-access-token': window.localStorage.getItem('token')},
            content_type: 'application/json'};
        axiosInstance.put("/category/"+this.props.recipe.category_id+"/recipe/"+this.props.recipe.id ,
         {recipe_name})
            .then(response => {
                this.props.parent.setState({mess: response.data.message, error: ""});
                this.props.recipeAfterEdit();
               
                
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
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit category ({this.props.recipe.recipe_name})</h5>
                        </div>
                        <div className="modal-body">
                            {this.state.error?
                                <div className="alert alert-danger">{this.state.error}</div>: ""}
                            
                                <div className="form-group">
                                    <label className="control-label col-sm-3">New Recipe Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" name="recipe_name" className="form-control"
                                               placeholder="Enter New Recipe name"
                                               defaultValue={this.props.recipe.recipe_name} onChange={this.inputHandler}/>
                                    </div>
                                </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-dismiss="modal">Close</button>
                                    <button  className="btn btn-primary" data-dismiss="modal" onClick={this.editRecipeHandler}>
                                        <i class="glyphicon glyphicon-edit"></i> Edit Recipe
                                    </button>
                                </div>
                            
                    </div>
                </div>
            </div>
        );
    }
}
export default EditRecipe;
