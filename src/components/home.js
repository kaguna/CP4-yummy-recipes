import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap'
import Toaster from './toasterSuccess';
import {panel_details, category_buttons } from '../App.css';
import Header from './navbar';
import CreateCategory from './create_category';
import EditCategory from './edit_category';
import DeleteCategory from './delete_category';
import axios from 'axios';
let url = "http://127.0.0.1:5000/categories/";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {categories: [], items: ""};
    }

    inputHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    view_categories_handler = (value, page) => {
        const header = {headers:{'x-access-token': window.localStorage.getItem('token')},
            content_type: 'application/json'};
            if(value){
                url = `${url}?q=${value}`;
            }else if(page){
                url = `${url}?page=${page}`;
            }
        axios.get(url,  header)
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
                        items:"0",mess: "", error: ""});
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
            url = "http://127.0.0.1:5000/categories/";
    };
    pagination_handler = (page) => {
        this.view_categories_handler(null, page)
    }
    search_handler = (event) => {
        event.preventDefault()
        this.view_categories_handler(event.target.value);
    }
    componentDidMount(){
        this.view_categories_handler();
    }

    render() {
        let {categories, items, keyword_search} = this.state;
        let pages = []
        for(let i = 1; i <= this.state.pages; i++){
            pages.push(
                <Pagination.Item
                active={i === this.state.current_page}
                onClick={ this.pagination_handler.bind(this, i)}
                >
                    {i}
                </Pagination.Item>,
            );
        }
        return (
            <div id="all_categories">
                <Header/>
                <Toaster/>
                <CreateCategory category_after_creation={this.view_categories_handler}/>
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
                                    onChange={this.search_handler} class="form-control" placeholder="Search
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
                                            <a href="#" className="btn btn-default col-sm-3 action_buttons"><span class="glyphicon glyphicon-eye-open"></span></a>
                                            <a href="#" className="btn btn-success col-sm-3 action_buttons" data-toggle="modal" data-target={`#edit_category${category.id}`}>
                                                <span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#" className="btn btn-danger col-sm-3 action_buttons"  data-toggle="modal" data-target={`#delete_category${category.id}`}>
                                                <span className="glyphicon glyphicon-trash"></span></a>
                                            </div>
                                            </div>
                                            </div>
                                    <EditCategory key={category.id} category_id={`edit_category${category.id}`} category= {category} 
                                        category_after_edit={this.view_categories_handler} parent={this}/>
                                    <DeleteCategory key={category.id} category_id={`delete_category${category.id}`} category= {category} 
                                        category_after_delete={this.view_categories_handler} parent={this}/>
                                
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
