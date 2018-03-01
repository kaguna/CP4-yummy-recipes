import React, { Component } from 'react';
import Toaster from './toasterSuccess';
import {panel_details, category_buttons } from '../App.css';
import Header from './navbar';
import CreateCategory from './create_category';
import axios from 'axios';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {categories: []};
    }
    view_categories_handler = () => {
        const header = {headers:{'x-access-token': window.localStorage.getItem('token')},
            content_type: 'application/json'};
        axios.get("http://127.0.0.1:5000/categories/",  header)
            .then(response => {
                this.setState({categories:response.data.categories});
            })
            .catch(error => {
                if (error.response) {
                    this.setState({error: error.response.data.message});
                } else if (error.request) {
                    document.getElementById("post_info").innerHTML = "Network error!";
                }
            });
    };
    componentDidMount(){
        this.view_categories_handler();
    }

    render() {
        const categories = this.state.categories;
        return (
            <div>
                <Header/>
                <Toaster/>
                <CreateCategory/>
            <div className="container">
                    <div className="col-sm-offset-1 col-sm-14">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                     <form className="navbar-form" role="search">
                                         <div className="col-sm-2">
                                            <i className="glyphicon glyphicon-list"></i> Category List
                                         </div>
                                    <div className="input-group add-on col-sm-9">
                                        <input type="text" className="form-control" placeholder="Search
                                                for a category..." name="srch-term"/>
                                        <div className="input-group-btn">
                                            <button className="btn btn-default" type="submit">
                                                <i class="glyphicon glyphicon-search"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="panel-body">


                                    <a href="#createcategory" data-toggle="modal" className="btn btn-primary"
                                   data-target="#createcategory"><i class="glyphicon glyphicon-plus"></i>
                                        Create Category</a>
                            <hr/>

                                { categories.map((categories) => (
                                <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <label>
                                                {categories.category_name}-{categories.id}
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#"><span class="glyphicon glyphicon-trash"></span></a>
                                            <a href="#"><span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#"><span class="glyphicon glyphicon-eye-open"></span></a>
                                        </span>
                                    </span>
                                    </span>
                                </div>

                                ))}


                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>
                                            No. of Categories <span className="label label-info">25</span></h6>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="pagination pagination-sm pull-right">
                                            <li className="disabled"><a href="javascript:void(0)">«</a></li>
                                            <li className="active"><a href="javascript:void(0)">1
                                                <span className="sr-only">(current)</span></a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">5</a></li>
                                            <li><a href="javascript:void(0)">»</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
