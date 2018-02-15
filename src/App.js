import React, { Component } from 'react';
import {Route,BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import Info from "./components/jumbotron"
import Login from "./components/login"
import Register from "./components/register"
import Categories from "./components/categories"
import ResetPassword from "./components/reset_password";
import Recipes from "./components/recipes";
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Router>
              <Switch>
                  <Route exact path="/" component={Info} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/categories" component={Categories} />
                  <Route exact path="/reset_password" component={ResetPassword} />
              </Switch>
          </Router>

      </div>
    );
  }
}

export default App;
