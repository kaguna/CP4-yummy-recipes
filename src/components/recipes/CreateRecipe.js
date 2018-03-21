/**
 * This is a modal component to create a recipe.
 */
import React, { Component } from 'react';
import axiosInstance from '../../common/AxiosInstance';

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { successMessage: '', errorMessage: '' };
  }

    inputHandler = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    createRecipeHandler = (event) => {
      const recipeName = event.target.elements.recipeName.value;
      const recipeProcedure = event.target.elements.recipeProcedure.value;
      const recipe = { recipe_name: recipeName, recipe_procedure: recipeProcedure };
      event.preventDefault();
      axiosInstance.post(`/category/${this.props.categoryId}/recipes/`, recipe)
        .then((response) => {
          this.setState({ successMessage: response.data.message, errorMessage: '' });
          this.props.recipeAfterCreation();
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message, successMessage: '' });
          } else if (error.request) {
            this.setState({ errorMessage: 'Cant connect to the server.Please check your connection and try again.',
              successMessage: '' });
          }
        });
      event.target.elements.recipeName.value = '';
      event.target.elements.recipeProcedure.value = '';
    };

    resetHandler = (event) => {
      this.setState({ successMessage: '', errorMessage: '' });
    }
    render() {
      const { errorMessage, successMessage } = this.state;
      return (
        <div
          className="modal fade"
          id="createRecipe"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Create Recipe</h5>
              </div>
              <div className="modal-body">
                {successMessage ?
                  <div className="alert alert-success">{successMessage}</div> : ''}
                {errorMessage ?
                  <div className="alert alert-danger">{errorMessage}</div> : ''}
                <form className="form-horizontal" onSubmit={this.createRecipeHandler}>
                  <div className="form-group">
                    <label className="control-label col-sm-3">Recipe Name:</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="recipeName"
                        className="form-control"
                        placeholder="Enter recipe name"
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-3">Recipe Procedure:</label>
                    <div className="col-sm-9">
                      <textarea
                        rows="6"
                        type="text"
                        name="recipeProcedure"
                        className="form-control"
                        placeholder="Enter recipe procedure"
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-danger" data-dismiss="modal" onClick={this.resetHandler}>Close</button>
                    <button type="submit" className="btn btn-primary">
                      <i className="glyphicon glyphicon-plus" /> Add Recipe
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
