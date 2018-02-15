import React, { Component } from 'react';
import axios from 'axios'
import {panel_details,forgot_pass } from '../App.css'
class Register extends Component {
render() {
    const {email, username,password} = this.state;
    return (
        <div className="container">
        <div className="panels_detail col-sm-offset-3 col-sm-6">
        <div className="panel panel-info">
        <div className="panel-heading">
        <div className="panel-title"><i className="glyphicon glyphicon-plus">
        </i> Create Account</div>
    </div>
    <div className="panel-body">
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