import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../common/AxiosInstance';
import Toaster from '../../common/ToasterSuccess';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: '' };
  }
    inputHandler = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };


    registerHandler = (event) => {
      const email = event.target.elements.email.value;
      const username = event.target.elements.username.value;
      const password = event.target.elements.password.value;
      const confirmPassword = event.target.elements.confirmPassword.value;
      const userDetails = { email: email, username: username, password: password };
      event.preventDefault();
      if (password !== confirmPassword) {
        this.setState({ errorMessage: 'Password did not match!' });
      } else {
        axiosInstance.post('/auth/register', userDetails)
          .then((response) => {
            this.props.history.push('./Login');
            toast.success(response.data.message);
          })
          .catch((error) => {
            if (error.response) {
              this.setState({ errorMessage: error.response.data.message });
            } else if (error.request) {
              this.setState({ errorMessage: 'Cant connect to the server.Please check your connection and try again.' });
            }
          });
      }
    };

    render() {
      const { errorMessage } = this.state;
      return (
        <div className="container">
          <Toaster />
          <div className="panels_detail col-sm-offset-3 col-sm-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title"><i className="glyphicon glyphicon-plus" /> Create Account
                </div>
              </div>
              <div className="panel-body">
                <div id="post_info">
                  {errorMessage ?
                    <div className="alert alert-danger">{errorMessage}</div> : ''}
                </div>
                <form className="form-horizontal" onSubmit={this.registerHandler}>
                  <div className="form-group">
                    <label className="control-label col-sm-2">Email:</label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2">Username</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter username"
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2">Password:</label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2">Confirm Password:</label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm password"
                        onChange={this.inputHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-12">
                      <button type="submit" className="btn btn-primary">
                        <i className="glyphicon glyphicon-user" /> Create Account
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-offset-2 col-sm-12">
                                    Already have an account? Login <a href="/login">here</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default Register;
