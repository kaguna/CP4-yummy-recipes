import React, { Component } from 'react';
import axiosInstance from '../../common/AxiosInstance';

class DeleteRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = { successMessage: '', errorMessage: '' };
  }

    deleteRecipeHandler = (event) => {
      event.preventDefault();
      axiosInstance.delete(`/category/${this.props.recipe.category_id}/recipe/${this.props.recipe.id}`)
        .then((response) => {
          this.props.parent.setState({ successMessage: response.data.message, errorMessage: '' });
          this.props.recipeAfterDelete();
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
      const { recipe_name } = this.props.recipe;
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
                <h5 className="modal-title" id="exampleModalLongTitle">
                            Delete Recipe ({recipe_name})
                  <a href="" className="pull-right" data-dismiss="modal">X</a>
                </h5>
              </div>
              <div className="modal-body">
                {errorMessage ?
                  <div className="alert alert-danger">{errorMessage}</div> : ''}
                <div className=" col-sm-12">
                  <h4>Are you sure you want to delete recipe <label className="control-label"> {recipe_name}?</label></h4>
                </div>
              </div>
              <div className="modal-footer">
                <button data-dismiss="modal" className="btn btn-default">
                  <i className="glyphicon glyphicon-remove" /> No, Cancel
                </button>
                <button data-dismiss="modal" type="button" onClick={this.deleteRecipeHandler} className="btn btn-danger">
                  <i className="glyphicon glyphicon-ok" /> Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default DeleteRecipe;
