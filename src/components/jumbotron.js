import React, { Component } from 'react';
import Login from "./users/Login"
import Register from "./users/Register"

class Info extends Component {
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h2 className="display-3">Yummy Recipes</h2>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-4"/>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="/register" role="button"><i className="glyphicon glyphicon-plus"></i> Register</a>{' '}
                        <a className="btn btn-primary btn-lg" href="/login" role="button"><i className="glyphicon glyphicon-log-in"></i> Login</a>
                    </p>
                </div>

            </div>
        );
    }
}
export default Info;