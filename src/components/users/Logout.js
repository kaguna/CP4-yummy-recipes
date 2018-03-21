/**
 * This destroys the user session.
 */
import React, { Component } from 'react';

class Logout extends Component {
    logoutHandler = () => {
      window.localStorage.clear();
      window.location.reload();
      window.location.assign('./Login');
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
