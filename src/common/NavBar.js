import React, { Component } from 'react';
import ChangePassword from '../components/users/ChangePassword';

class Header extends Component {
  render() {
    if (!localStorage.token) {
      window.location.assign('/login');
    }
    return (
      <nav className="navbar navbar-default">
        <ChangePassword />
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href=""><i className="glyphicon glyphicon-cutlery" /> Yummy Recipes</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <li className="nav navbar-nav navbar-right">
              <li><a
                href=""
                className="dropdown-toggle"
                id="profile"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <span className="glyphicon glyphicon-user">
                  <span id="username"> {window.localStorage.getItem('username')}</span>
                  <span className="caret" />
                </span>
              </a>
                <ul className="dropdown-menu" aria-labelledby="profile">
                  <li><a href="#changepassword" data-toggle="modal" data-target="#changepassword">
                    <i className="glyphicon glyphicon-edit" /> Change password
                  </a>
                  </li>
                  <li role="separator" className="divider" />
                  <li><a href="/logout"><i className="glyphicon glyphicon-log-out" /> Logout</a></li>
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
