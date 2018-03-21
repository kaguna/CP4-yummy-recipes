/**
 * This is a modal component to authenticate the user.
 */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Toaster from '../../common/ToasterSuccess';
import axiosInstance from '../../common/AxiosInstance';
import ResetPassword from './ResetPassword';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: '' };
  }

    inputHandler = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    loginHandler = (event) => {
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;
      const loginDetails = { email: email, password: password };
      event.preventDefault();
      axiosInstance.post('/auth/login', loginDetails)
        .then((response) => {
          window.localStorage.setItem('username', response.data.username);
          window.localStorage.setItem('email', response.data.email);
          window.localStorage.setItem('token', response.data.access_token);
          this.props.history.push('./Home');
          toast.success(response.data.message);
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
      const { errorMessage } = this.state;
      return (
        <div className="container">
          <Toaster />
          <ResetPassword />
          <div className="panels_detail col-sm-offset-3 col-sm-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title">Login</div>
                <div className="forgotPass">
                  <a href="#resetpassword" data-toggle="modal" data-target="#resetpassword">
                                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="panel-body">
                {errorMessage ?
                  <div className="alert alert-danger">{errorMessage}</div> : ''}
                <form className="form-horizontal" onSubmit={this.loginHandler}>
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
                    <div className="col-sm-offset-2 col-sm-12">
                      <button type="submit" className="btn btn-primary">
                        <i className="glyphicon glyphicon-log-in" />  Login
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-offset-2 col-sm-12">
                                    You dont have an account yet? Register <a href="/register">here</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default Login;
