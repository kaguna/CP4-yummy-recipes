/**
 * This is a modal component to edit the recipe and the recipe procedure.
 */
import React, { Component } from 'react';
import axiosInstance from '../../common/AxiosInstance';

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { recipe_name: '', recipe_procedure: '', errorMessage: '', successMessage: '' };
  }
    inputHandler = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    editRecipeHandler = (event) => {
      event.preventDefault();
      const { recipe_name, recipe_procedure } = this.state;
      axiosInstance.put(
        `/category/${this.props.recipe.category_id}/recipe/${this.props.recipe.id}`,
        { recipe_name, recipe_procedure },
      )
        .then((response) => {
          this.props.parent.setState({ successMessage: response.data.message, errorMessage: '' });
          this.props.recipeAfterEdit();
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message });
          } else if (error.request) {
            this.setState({ errorMessage: 'Cant connect to the server.Please check your connection and try again.',
            });
          }
        });
    };
    render() {
      const { recipeId } = this.props;
      const { recipe_name, recipe_description } = this.props.recipe;
      const { errorMessage } = this.state;
      return (

        <div
          className="modal fade"
          id={recipeId}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Edit Recipes ({recipe_name})</h5>
              </div>
              <div className="modal-body">
                {errorMessage ?
                  <div className="alert alert-danger">{errorMessage}</div> : ''}
                <div className="row">
                  <div className="form-group">
                    <label className="control-label col-sm-3">New Recipe Name:</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name="recipe_name"
                        className="form-control"
                        placeholder="Enter New Recipe name"
                        defaultValue={recipe_name}
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group">
                    <label className="control-label col-sm-3">Recipe Procedure:</label>
                    <div className="col-sm-9">
                      <textarea
                        rows="10"
                        type="text"
                        name="recipe_procedure"
                        className="form-control"
                        placeholder="Enter recipe procedure"
                        defaultValue={recipe_description}
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">Close</button>
                <button className="btn btn-primary" data-dismiss="modal" onClick={this.editRecipeHandler}>
                  <i className="glyphicon glyphicon-edit" /> Edit Recipe
                </button>
              </div>

            </div>
          </div>
        </div>
      );
    }
}
export default EditRecipe;
