import React, { Component } from 'react';
import axiosInstance from '../../AxiosInstance'
import Home from './Recipes';
class CreateRecipe extends Component {
    constructor(props){
        super(props);
        this.state = { recipe_name: "", recipe_procedure:""}
    }

    inputHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    createRecipeHandler = (event) => {
        const {recipe_name, recipe_procedure} = this.state;
        event.preventDefault();
        axiosInstance.post("/category/"+this.props.category_id+"/recipes/", {recipe_name, recipe_procedure})
            .then(response => {
                this.setState({mess: response.data.message, error: "",});
                this.props.recipeAfterCreation();
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
            <div className="modal fade" id="create_recipe" tabindex = "-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div class="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Create Recipe</h5>
                        </div>
                        <div className="modal-body">
                            {this.state.mess?
                            <div className="alert alert-success">{this.state.mess}</div>: ""}
                            {this.state.error?
                                <div className="alert alert-danger">{this.state.error}</div>: ""}
                            <form className="form-horizontal" onSubmit={this.createRecipeHandler}>
                                <div className="form-group">
                                    <label className="control-label col-sm-3">Recipe Name:</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="recipe_name" className="form-control" placeholder="Enter Category name"
                                               value={this.state.recipe_name} onChange={this.inputHandler}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-3">Recipe Procedure:</label>
                                    <div className="col-sm-9">
                                        <textarea rows="6" type="text" name="recipe_procedure" className="form-control" placeholder="Enter Category name"
                                               value={this.state.recipe_procedure} onChange={this.inputHandler}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">
                                        <i class="glyphicon glyphicon-plus"></i> Add Recipe
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
export default CreateRecipe;
