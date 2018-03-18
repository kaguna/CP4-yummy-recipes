import React, { Component } from 'react';
import axiosInstance from '../../common/AxiosInstance';

class DeleteCategory extends Component {
  constructor(props) {
    super(props);

    this.state = { errorMessage: '', category_name: '' };
  }

    deleteCategoryHandler = (event) => {
      event.preventDefault();
      axiosInstance.delete(`/category/${this.props.category.id}`)
        .then((response) => {
          this.props.parent.setState({ successMessage: response.data.message,
            errorMessage: '' });
          this.props.categoryAfterDelete();
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message,
            });
          } else if (error.request) {
            this.setState({ errorMessage: 'Cant connect to the server.Please check your connection and try again.',
            });
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
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                            Delete category ({category_name})
                  <a href="" className="pull-right" data-dismiss="modal">X</a>
                </h5>
              </div>
              <div className="modal-body">
                {errorMessage ?
                  <div className="alert alert-danger">{errorMessage}</div> : ''}
                <div className=" col-sm-12">
                  <h4>Are you sure you want to delete category <label className="control-label"> {category_name}?</label></h4>
                </div>
              </div>
              <div className="modal-footer">
                <button data-dismiss="modal" className="btn btn-default">
                  <i className="glyphicon glyphicon-remove" /> No, Cancel
                </button>
                <button data-dismiss="modal" type="button" onClick={this.deleteCategoryHandler} className="btn btn-danger">
                  <i className="glyphicon glyphicon-ok" /> Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default DeleteCategory;
