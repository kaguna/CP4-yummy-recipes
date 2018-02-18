import React, { Component } from 'react';
import axios from 'axios'
import {panel_details,forgot_pass } from '../App.css'
import { Redirect } from 'react-router'
class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {email: '', username: '', password: '', c_password: '', error: ''}
    }
    inputHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };


    registerHandler = (event) => {
        const {email, username,password, c_password} = this.state;
        event.preventDefault();
        if (password != c_password){
            this.setState({error: "Password did not match!" });
        }
        else
        {
            axios.post("http://127.0.0.1:5000/auth/register", {email, username, password})
                .then(response => {
                    this.setState({mess: response.data.message, redirect: true});
                })
                .catch(error => {
                    if (error.response) {
                        this.setState({error: error.response.data.message});
                    } else if (error.request) {
                        document.getElementById("post_info").innerHTML = "Network error!";
                    }
                });
        }
    };

    render() {
        const {redirect, email, username,password} = this.state;
        if (redirect)
            return (<Redirect to={{
                pathname: '/login',
                state: { response_message: this.state.mess }
            }} />);
        return (
            <div className="container">
                <div className="panels_detail col-sm-offset-3 col-sm-6">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title"><i className="glyphicon glyphicon-plus">
                            </i> Create Account</div>
                        </div>
                        <div className="panel-body">
                            <div id="post_info">
                                {this.state.error?
                                    <div className="alert alert-danger">{this.state.error}</div>: ""}
                            </div>
                            <form className="form-horizontal" onSubmit={this.registerHandler}>
                                <div className="form-group">
                                    <label className="control-label col-sm-2">Email:</label>
                                    <div className="col-sm-10">
                                        <input type="email" name="email" className="form-control"
                                               placeholder="Enter email" value={this.state.email} id="reg_email"
                                               onChange={this.inputHandler}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-2">Username</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="username" className="form-control"
                                               placeholder="Enter username" value={this.state.username} id="reg_username"
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
                                    <label className="control-label col-sm-2">Confirm Password:</label>
                                    <div className="col-sm-10">
                                        <input type="password" name="c_password" className="form-control"
                                               placeholder="Confirm password" value={this.state.c_password} id="c_reg_password"
                                               onChange={this.inputHandler}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-12">
                                        <button type="submit" className="btn btn-default">
                                            <i className="glyphicon glyphicon-user"></i> Create Account</button>
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