/**
 * This is a modal component to edit a category name and the procedure.
 */
import React, { Component } from 'react';
import axiosInstance from '../../common/AxiosInstance';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: '', category_name: '' };
  }
    inputHandler = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    editCategoryHandler = (event) => {
      event.preventDefault();
      const { category_name } = this.state;
      axiosInstance.put(`/category/${this.props.category.id}`, { category_name })
        .then((response) => {
          this.props.parent.setState({ successMessage: response.data.message, errorMessage: '' });
          this.props.categoryAfterEdit();
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message });
          } else if (error.request) {
            this.setState({ errorMessage: 'Cant connect to the server.Please check your connection and try again.' });
          }
        });
    };
    render() {
      const { category_id } = this.props;
      const { category_name } = this.props.category;
      const { errorMessage } = this.state;
      return (

        <div
          className="modal fade"
          id={category_id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Edit category ({category_name})</h5>
              </div>
              <div className="modal-body">
                {errorMessage ?
                  <div className="alert alert-danger">{errorMessage}</div> : ''}

                <div className="form-group">
                  <label className="control-label col-sm-3">New Category Name:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="category_name"
                      className="form-control"
                      placeholder="Enter New Category name"
                      defaultValue={category_name}
                      onChange={this.inputHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">Close</button>
                <button className="btn btn-primary" data-dismiss="modal" onClick={this.editCategoryHandler}>
                  <i className="glyphicon glyphicon-edit" /> Edit Category
                </button>
              </div>

            </div>
          </div>
        </div>
      );
    }
}
export default EditCategory;
