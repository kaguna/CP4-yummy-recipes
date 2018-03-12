import React, { Component } from 'react';
import {panel_details,forgot_pass } from '../App.css';
import {toast} from 'react-toastify'
import Toaster from './toasterSuccess'
import axios from 'axios'
import ResetPassword from './reset_password';

import { Redirect } from 'react-router'
class Login extends Component {
    constructor(props){
        super(props);
        this.state = { email: "", password: ""}
    }

    inputHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    loginHandler = (event) => {
        const {email,password} = this.state;
        event.preventDefault();
        axios.post("http://127.0.0.1:5000/auth/login", {email, password})
            .then(response => {
                toast.success(response.data.message);
                window.localStorage.setItem("username", response.data.username);
                window.localStorage.setItem("email", response.data.email);
                window.localStorage.setItem("token", response.data.access_token);
                this.props.history.push("/home");
            })
            .catch(error => {
                if (error.response) {
                    this.setState({error: error.response.data.message});
                } else if (error.request) {
                    this.setState({error:"Can't connect to the server.Please check your connection and try again.", mess: ""});
                }
            });
    };

    render() {
        const {email,password} = this.state;
        return (
            <div className="container">
                    <Toaster/>
                    <ResetPassword/>
                <div className="panels_detail col-sm-offset-3 col-sm-6">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Login</div>
                            <div className="forgot_pass">
                                <a href="#resetpassword" data-toggle="modal" data-target="#resetpassword">
                                    Forgot password?</a>
                            </div>
                        </div>

                        <div className="panel-body">
                            {/*{this.props.location.state.response_message?*/}
                                {/*<div className="alert alert-success">{this.props.location.state.response_message}</div>: ""}*/}
                            {this.state.error?
                                <div className="alert alert-danger">{this.state.error}</div>: ""}
                            <form className="form-horizontal" onSubmit={this.loginHandler}>
                                <div className="form-group">
                                    <label className="control-label col-sm-2">Email:</label>
                                    <div className="col-sm-10">
                                        <input type="email" name="email" className="form-control"
                                               placeholder="Enter email" value={this.state.email} id="reg_email"
                                               onChange={this.inputHandler}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-2">Password:</label>
                                    <div className="col-sm-10">
                                        <input type="password" name="password" className="form-control"
                                               placeholder="Enter password" value={this.state.password} id="reg_password"
                                               onChange={this.inputHandler}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-12">
                                        <button type="submit" className="btn btn-default">
                                            <i className="glyphicon glyphicon-log-in"></i>  Login</button>
                                    </div>
                                </div>
                                <div className="col-sm-offset-2 col-sm-12">
                                    You don't have an account yet? Register <a href="/register">here</a>
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