/**
 * This is a modal component reset a password via email.
 */
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axiosInstance from '../../common/AxiosInstance';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: '', successMessage: '', status: 'hidden' };
  }

    inputHandler = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    resetPasswordHandler = (event) => {
      const email = { email: event.target.elements.emailAdress.value };
      event.preventDefault();
      this.setState({ status: '' });
      axiosInstance.post('/auth/send_reset_password_token', email)
        .then((response) => {
          this.setState({ successMessage: response.data.message,
            errorMessage: '',
            status: 'hidden' });
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message,
              successMessage: '',
              status: 'hidden' });
          } else if (error.request) {
            this.setState({ errorMessage: 'Cant connect to the server.Please check your connection and try again.',
              successMessage: '',
              status: 'hidden' });
          }
        });
      event.target.elements.emailAdress.value = ' ';
    };
    resetHandler = (event) => {
      this.setState({ successMessage: '', errorMessage: '' });
    }
    render() {
      const { successMessage, errorMessage, status } = this.state;
      return (
        <div
          className="modal fade"
          id="resetpassword"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Email login credetials</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className={status}>
                  <Loader type="ThreeDots" color="#337ab7"height="100" width="100" />
                </div>
                {successMessage ?
                  <div className="alert alert-success">{successMessage}</div> : ''}
                {errorMessage ?
                  <div className="alert alert-danger">{errorMessage}</div> : ''}
                <form className="form-horizontal" onSubmit={this.resetPasswordHandler}>
                  <div className="form-group">
                    <label className="control-label col-sm-2">Email:</label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        name="emailAdress"
                        className="form-control"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={this.resetHandler} data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Send Email</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default ResetPassword;
