import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap'
import Toaster from './ToasterSuccess';
import {panel_details, category_buttons } from '../App.css';
import Header from './NavBar';
import CreateCategory from './categories/CreateCategory';
import EditCategory from './categories/EditCategory';
import DeleteCategory from './categories/DeleteCategory';
import Recipes from './recipes/Recipes'
import axios from 'axios';
import axiosInstance from '../AxiosInstance';
let url = "/categories/";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {categories: [], items: "",
    cat_name: ''};
    }

    inputHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    viewCategoriesHandler = (value, page) => {
            if(value){
                url = `${url}?q=${value}`;
            }else if(page){
                url = `${url}?page=${page}`;
            }
        axiosInstance.get(url)
            .then(response => {
                this.setState({
                    categories:response.data.categories,
                    items:response.data.total_items,
                    pages: response.data.total_pages,
                    current_page: response.data.current_page,
                     no_category:""});
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.data.message ==="no_categories")
                    {
                        this.setState({no_category: "Welcome to the Yummy recipes, create your first category and enjoy.", 
                        items:"0",mess: "", error: "", categories: [], pages:""});
                    }
                    else if(error.response.data.message ==="no_category_on_search")
                    {
                        this.setState({no_category: "No category with such letters.", 
                        items:"0",mess: "", error: "", categories: []});
                    }else{
                    this.setState({error: error.response.data.message, mess: ""});
                    }
                } else if (error.request) {
                    this.setState({error:"Network error!", mess: ""});
                }
            });
            url = "/categories/";
    };
    paginationHandler = (page) => {
        this.viewCategoriesHandler(null, page)
    }
    searchHandler = (event) => {
        event.preventDefault()
        this.viewCategoriesHandler(event.target.value);
    }
    componentDidMount(){
        this.viewCategoriesHandler();
    }

    render() {
        let {categories, items, keyword_search} = this.state;
        let pages = []
        for(let i = 1; i <= this.state.pages; i++){
            pages.push(
                <Pagination.Item
                active={i === this.state.current_page}
                onClick={ this.paginationHandler.bind(this, i)}
                >
                    {i}
                </Pagination.Item>,
            );
        }
        return (
            <div id="all_categories">
                <Header/>
                <Toaster/>
                <CreateCategory categoryAfterCreation={this.viewCategoriesHandler}/>
            <div className="container">
                    <div className="col-sm-14">
                        <div className="panel panel">
                            <div className="panel-body">
                            <div className="row">
                            <div className="col-sm-2">
                                  <h5>
                                    <i className="glyphicon glyphicon-list"></i> Category List <span className="label label-info">{items}</span>
                                    </h5>
                                </div>
                            <div className="col-sm-7">
                            <div class="form-group has-feedback has-search">
                                    <span class="glyphicon glyphicon-search form-control-feedback"></span>
                                    <input type="text" name="keyword_search" 
                                    onChange={this.searchHandler} class="form-control" placeholder="Search
                                                for a category..."/>
                                </div>
                        
                                </div>
                                <div className="col-sm-3">
                            <a href="#createcategory" data-toggle="modal" className="btn btn-primary"
                                   data-target="#createcategory"><i class="glyphicon glyphicon-plus"></i>
                                        Create Category</a>
                                    </div>
                                </div>
                                <hr/>
                            <div> 
                                
                            {this.state.mess?
                                <div className="alert alert-success">{this.state.mess} 
                                    <a href="#" className="pull-right" data-dismiss="alert">X</a>
                                </div>: ""}
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
                                            <a href={`/category/${category.id}/recipes`}  className="btn btn-default col-sm-3 action_buttons"><span class="glyphicon glyphicon-eye-open"></span></a>
                                            <a href="#" className="btn btn-success col-sm-3 action_buttons" data-toggle="modal" data-target={`#edit_category${category.id}`}>
                                                <span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#" className="btn btn-danger col-sm-3 action_buttons"  data-toggle="modal" data-target={`#delete_category${category.id}`}>
                                                <span className="glyphicon glyphicon-trash"></span></a>
                                            </div>
                                            </div>
                                            </div>
                                    <EditCategory key={category.id} category_id={`edit_category${category.id}`} category= {category} 
                                        categoryAfterEdit={this.viewCategoriesHandler} parent={this}/>
                                    <DeleteCategory key={category.id} category_id={`delete_category${category.id}`} category= {category} 
                                        categoryAfterDelete={this.viewCategoriesHandler} parent={this}/>
                                    
                                            </div>
                                   ))}
                            </div>
                            </div>
                            <div className="panel-footer bg-dark">
                                      <Pagination>
                                        <Pagination bsSize="large">{pages}</Pagination>
                                      </Pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }
}

export default Home;
