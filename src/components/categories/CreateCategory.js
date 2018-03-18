import React, { Component } from 'react';
import axiosInstance from '../../common/AxiosInstance';

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: '', successMessage: '' };
  }

    inputHandler = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    createCategoryHandler = (event) => {
      const categoryName = event.target.elements.categoryName.value;
      const categoryDetails = { category_name: categoryName };
      event.preventDefault();
      axiosInstance.post('/categories/', categoryDetails)
        .then((response) => {
          this.setState({ successMessage: response.data.message, errorMessage: '' });
          this.props.categoryAfterCreation();
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message, successMessage: '' });
          } else if (error.request) {
            this.setState({
              errorMessage: 'Cant connect to the server.Please check your connection and try again.',
              successMessage: '',
            });
          }
        });
      event.target.elements.categoryName.value = '';
    };
    resetHandler = (event) => {
      this.setState({ errorMessage: '', successMessage: '' });
    }
    render() {
      const { successMessage, errorMessage } = this.state;
      return (
        <div
          className="modal fade"
          id="createcategory"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Create Category</h5>
              </div>
              <div className="modal-body">
                {successMessage ?
                  <div className="alert alert-success">{successMessage}</div> : ''}
                {errorMessage ?
                  <div className="alert alert-danger">{errorMessage}</div> : ''}
                <form className="form-horizontal" onSubmit={this.createCategoryHandler}>
                  <div className="form-group">
                    <label className="control-label col-sm-3">Category Name:</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="categoryName"
                        className="form-control"
                        placeholder="Enter Category name"
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.resetHandler}>Close</button>
                    <button type="submit" className="btn btn-primary">
                      <i className="glyphicon glyphicon-plus" /> Add Category
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
export default CreateCategory;
