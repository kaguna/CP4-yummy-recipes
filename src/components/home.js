import React, { Component } from 'react';
import Toaster from './toasterSuccess';
import {panel_details, category_buttons } from '../App.css';
import Header from './navbar';
import CreateCategory from './create_category';
import EditCategory from './edit_category';
import axios from 'axios';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {categories: [], items: ""};
    }
    view_categories_handler = () => {
        const header = {headers:{'x-access-token': window.localStorage.getItem('token')},
            content_type: 'application/json'};
        axios.get("http://127.0.0.1:5000/categories/",  header)
            .then(response => {
                this.setState({categories:response.data.categories, items:response.data.total_items, no_category:""});
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.data.message =="no_categories")
                    {
                        this.setState({no_category: "You have no category, please create.", 
                            mess: "", error: ""});
                    }
                    else
                    {
                    this.setState({error: error.response.data.message, mess: ""});
                    }
                } else if (error.request) {
                    document.getElementById("post_info").innerHTML = "Network error!";
                }
            });
    };
    componentDidMount(){
        this.view_categories_handler();
    }

    render() {
        const {categories, items} = this.state;
        return (
            <div id="all_categories">
                <Header/>
                <Toaster/>
                <CreateCategory category_after_creation={this.view_categories_handler}/>
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
                            <span>{this.state.no_category}</span>
                                { categories.map((category) => (
                                <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <label>
                                                {category.category_name}
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#"><span class="glyphicon glyphicon-trash"></span></a>
                                            <a href="#"  data-toggle="modal" data-target={`#category${category.id}`}>
                                                <span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#"><span class="glyphicon glyphicon-eye-open"></span></a>
                                        </span>
                                    </span>
                                    </span>
                                    <EditCategory category_id={`category${category.id}`} category= {category} category_after_edit={this.view_categories_handler}/>
                                </div>
                                ))}


                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>
                                            No. of Categories <span className="label label-info">{items}</span></h4>
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
