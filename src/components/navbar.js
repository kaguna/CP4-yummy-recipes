import React, { Component } from 'react';
class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#"><i className="glyphicon glyphicon-cutlery"></i> Yummy Recipes</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <li className="nav navbar-nav navbar-right">
                            <li><a href="#" className="dropdown-toggle" id="profile" data-toggle="dropdown" aria-haspopup="true"
                               aria-expanded="true">
                                <span className="glyphicon glyphicon-user">
                                    <span id="username"> {window.localStorage.getItem("username")}</span>
                                    <span className="caret"></span>
                                </span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="profile">
                                <li><a href="#"><i className="glyphicon glyphicon-edit"></i> Reset password</a></li>
                                <li role="separator" className="divider"></li>
                                <li><a href="#"><i className="glyphicon glyphicon-log-out"></i> Logout</a></li>
                            </ul>
                            </li>
                        </li>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
