import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Info from './common/Jumbotron';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import Register from './components/users/Register';
import Recipes from './components/recipes/Recipes';
import ResetPassword from './components/users/ResetPassword';
import Home from './common/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Info} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/reset_password" component={ResetPassword} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/category/:category_id/recipes/" component={Recipes} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
