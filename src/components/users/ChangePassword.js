import React, { Component } from 'react';
import axiosInstance from '../../common/AxiosInstance';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { successMessage: '', errorMessage: '' };
  }

    inputHandler = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    changePasswordHandler = (event) => {
      const password = event.target.elements.password.value;
      const retypedPassword = event.target.elements.retypedPassword.value;
      const email = window.localStorage.getItem('email');
      const userDetails = { password: password, retyped_password: retypedPassword, email: email };
      event.preventDefault();
      axiosInstance.put('/auth/reset_password', userDetails)
        .then((response) => {
          this.setState({ successMessage: response.data.message,
            errorMessage: '' });
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message, successMessage: '' });
          } else if (error.request) {
            this.setState({ errorMessage: 'Cant connect to the server.Please check your connection and try again.',
              successMessage: '' });
          }
        });
      event.target.elements.password.value = '';
      event.target.elements.retypedPassword.value = '';
    };
    resetHandler = (event) => {
      this.setState({ successMessage: '', errorMessage: '' });
    }
    render() {
      const { errorMessage, successMessage } = this.state;
      return (
        <div
          className="modal fade"
          id="changepassword"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Change password here</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {successMessage ?
                  <div className="alert alert-success">{successMessage}</div> : ''}
                {errorMessage ?
                  <div className="alert alert-danger">{errorMessage}</div> : ''}

                <form className="form-horizontal" onSubmit={this.changePasswordHandler}>
                  <div className="form-group">
                    <label className="control-label col-sm-2">New password:</label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter new password"
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2">Confirm Password:</label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        name="retypedPassword"
                        className="form-control"
                        placeholder="Confirm paswword"
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={this.resetHandler}
                    >Close
                    </button>
                    <button type="submit" className="btn btn-primary">Change password</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default ChangePassword;
