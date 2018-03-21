/**
 * This shows the procedure to prepare the recipe.
 */
import React, { Component } from 'react';

class Viewprocedure extends Component {
  render() {
    const { recipeId } = this.props;
    const { recipe_name, recipe_description } = this.props.recipe;
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
              <h5 className="modal-title" id="exampleModalLongTitle">Procedure for preparing {recipe_name}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="procedure">
                {recipe_description}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Viewprocedure;
