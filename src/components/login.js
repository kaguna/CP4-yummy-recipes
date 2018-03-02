import React, { Component } from 'react';
import {panel_details,forgot_pass } from '../App.css';
import {toast} from 'react-toastify'
import Toaster from './toasterSuccess'
import axios from 'axios'

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
                window.localStorage.setItem("token", response.data.access_token);
                this.props.history.push("/home");
            })
            .catch(error => {
                if (error.response) {
                    this.setState({error: error.response.data.message});
                } else if (error.request) {
                    document.getElementById("post_info").innerHTML = "Network error!";
                }
            });
    };

    render() {
        const {email,password} = this.state;
        return (
            <div className="container">
                    <Toaster/>
                <div className="panels_detail col-sm-offset-3 col-sm-6">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Login</div>
                            <div className="forgot_pass">
                                <a href="#exampleModalCenter" data-toggle="modal" data-target="#exampleModalCenter">
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
                <div className="modal fade" id="exampleModalCenter" tabindex = "-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div class="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Email login credetials</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="control-label col-sm-2">Email:</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" placeholder="Enter email"/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Send Email</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;