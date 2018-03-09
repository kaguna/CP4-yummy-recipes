import React, { Component } from 'react';
import Toaster from './toasterSuccess';
import {panel_details, category_buttons } from '../App.css';
import Header from './navbar';
import CreateCategory from './create_category';
import EditCategory from './edit_category';
import DeleteCategory from './delete_category';
import axios from 'axios';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {categories: [], items: ""};
    }
    view_categories_handler = () => {
        this.setState({categories: [], items: ""});
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
                        this.setState({no_category: "Welcome to the Yummy recipes, create your first category and enjoy.", 
                        items:"0",mess: "", error: ""});
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
                    <div className="col-sm-14">
                        <div className="panel panel">
                            <div className="panel-heading">

                            <div className="row">
                            <div className="col-sm-9">
                            <form className="navbar-form" role="search">
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
                                <div className="col-sm-3">
                            <a href="#createcategory" data-toggle="modal" className="btn btn-primary pull-right"
                                   data-target="#createcategory"><i class="glyphicon glyphicon-plus"></i>
                                        Create Category</a>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <div className="panel-body">
                            <div> 
                                
                            {this.state.mess?
                                <div className="alert alert-success">{this.state.mess} 
                                    <a href="#" className="pull-right" data-dismiss="alert">X</a>
                                </div>: ""}
                                </div>

                                <div className="col-sm-2">
                                            <i className="glyphicon glyphicon-list"></i> Category List
                                         </div>
                            <label>{this.state.no_category}</label>
                            <div className="row">
                                { categories.map((category) => (
                                            <div className="col-sm-3">
                                            <div className="panel panel-default" >
                                            <div className="panel-heading">
                                                <h3 className="text-center">{category.category_name}</h3>
                                            </div>
                                            <div className="panel-body">
                                            <div>Date created: {category.date_created.substring(0, 17)} at {category.date_created.substring(17, 25)}</div>
                                            <hr/>
                                            <div>Date Updated: {category.date_created.substring(0, 17)} at {category.date_created.substring(17, 25)}</div>
                                            </div>
                                            <div className="panel-footer">
                                            <div className="row">
                                            <a href="#" className="btn btn-default col-sm-3 action_buttons"><span class="glyphicon glyphicon-eye-open"></span></a>
                                            <a href="#" className="btn btn-success col-sm-3 action_buttons" data-toggle="modal" data-target={`#edit_category${category.id}`}>
                                                <span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#" className="btn btn-danger col-sm-3 action_buttons"  data-toggle="modal" data-target={`#delete_category${category.id}`}>
                                                <span className="glyphicon glyphicon-trash"></span></a>
                                            </div>
                                            </div>
                                            </div>
                                            <EditCategory category_id={`edit_category${category.id}`} category= {category} 
                                    category_after_edit={this.view_categories_handler} parent={this}/>
                                    <DeleteCategory category_id={`delete_category${category.id}`} category= {category} 
                                    category_after_delete={this.view_categories_handler} parent={this}/>
                                
                                            </div>
                                   ))}
                            </div>

                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>
                                            Categories <span className="label label-info">{items}</span></h4>
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
