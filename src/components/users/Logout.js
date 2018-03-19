/**
 * This destroys the user session.
 */
import React, { Component } from 'react';

class Logout extends Component {
    logoutHandler = () => {
      window.localStorage.clear();
      window.location.reload();
      this.props.history.push('./Login');
    };
    componentDidMount() {
      this.logoutHandler();
    }
    render() {
      return (
        <span>
                logging out...
        </span>
      );
    }
}
export default Logout;
