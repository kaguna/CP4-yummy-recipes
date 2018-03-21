/**
 * This serves as a landing page.
 */
import React, { Component } from 'react';
import pic1 from '../common/images/soup.jpg';
import pic2 from '../common/images/Mint-Dark-Chocolate-recipe.jpg';
import pic3 from '../common/images/rice.jpg';

class Info extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <div className="row">
            <p className="lead pull-right">
              <a className="btn btn-primary btn-lg" href="/register" role="button"><i className="glyphicon glyphicon-plus" /> Register</a>{' '}
              <a className="btn btn-primary btn-lg" href="/login" role="button"><i className="glyphicon glyphicon-log-in" /> Login</a>
            </p>
          </div>
          <div className="row">
            <h2 className="display-3">Yummy Recipes</h2>
            <p className="lead">Welcome to the Yummy recipes management system. This enables you to
            manage you recipes and organize them in categories they belong to.
            </p>
          </div>
          <div className="row">
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active" />
                <li data-target="#myCarousel" data-slide-to="1" />
                <li data-target="#myCarousel" data-slide-to="2" />
              </ol>

              <div className="carousel-inner">

                <div className="item active">
                  <img src={pic1} alt="Los Angeles" />
                  <div className="carousel-caption">
                    <h3>Soup burger</h3>
                    <p>Supper delicious meal.</p>
                  </div>
                </div>

                <div className="item">
                  <img src={pic3} alt="Chicago" />
                  <div className="carousel-caption">
                    <h3>Mwea Rice</h3>
                    <p>Sweet scented rice.</p>
                  </div>
                </div>

                <div className="item">
                  <img src={pic2} alt="New York" />
                  <div className="carousel-caption">
                    <h3>Chocolate</h3>
                    <p>Dark brown chocolate</p>
                  </div>
                </div>

              </div>
              <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left" />
                <span className="sr-only">Previous</span>
              </a>
              <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right" />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Info;
