import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap'
import Toaster from '../ToasterSuccess';
import {panel_details, category_buttons } from '../../App.css';
import Header from '../NavBar';
import CreateRecipe from './CreateRecipe';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import ViewProcedure from './ViewProcedure';
import axiosInstance from '../../AxiosInstance'
class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {recipes: [], items: ""};
    }

    inputHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    viewRecipesHandler = (value, page) => {
        let url = "/category/"+this.props.match.params.category_id+"/recipes/";
            if(value){
                url = `${url}?q=${value}`;
            }else if(page){
                url = `${url}?page=${page}`;
            }
        axiosInstance.get(url)
            .then(response => {
                this.setState({
                    recipes:response.data.recipes,
                    items:response.data.total_items,
                    pages: response.data.total_pages,
                    current_page: response.data.current_page,
                     no_recipe:""});
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status ===402)
                    {
                        this.setState({no_recipe: error.response.data.message, 
                        items:"0",mess: "", error: "", recipes: [], pages:""});
                    }
                    else if(error.response.status ===404)
                    {
                        this.setState({no_recipe: "No recipe with such letter(s).", 
                        items:"0",mess: "", error: "", recipes: []});
                    }else{
                    this.setState({error: error.response.data.message, mess: ""});
                    }
                } else if (error.request) {
                    this.setState({error:"Network error!", mess: ""});
                }
            });
            url = "http://127.0.0.1:5000/category/"+this.props.match.params.category_id+"/recipes/";
    };
    paginationHandler = (page) => {
        this.viewRecipesHandler(null, page)
    }
    searchHandler = (event) => {
        event.preventDefault()
        this.viewRecipesHandler(event.target.value);
    }
    componentDidMount(){
        this.viewRecipesHandler();
    }

    render() {
        let {recipes, items, keyword_search} = this.state;
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
            <div id="all_recipes">
                <Header/>
                <Toaster/>
                <CreateRecipe recipeAfterCreation={this.viewRecipesHandler} category_id={this.props.match.params.category_id}/>
            <div className="container">
                    <div className="col-sm-14">
                        <div className="panel panel">
                            <div className="panel-body">
                            <div className="row">
                            <div className="col-sm-2">
                                  <h5>
                                    <i className="glyphicon glyphicon-list"></i> 
                                    Recipe List <span className="label label-info">{items}</span>
                                    </h5>
                                </div>
                            <div className="col-sm-7">
                            <div class="form-group has-feedback has-search">
                                    <span class="glyphicon glyphicon-search form-control-feedback"></span>
                                    <input type="text" name="keyword_search" 
                                    onChange={this.searchHandler} class="form-control" placeholder="Search
                                                for a recipe..."/>
                                </div>
                        
                                </div>
                                <div className="col-sm-3">
                            <a href="#create_recipe" data-toggle="modal" className="btn btn-primary"
                                   data-target="#create_recipe"><i class="glyphicon glyphicon-plus"></i>
                                        Create Recipe</a>
                                    </div>
                                </div>
                                <div className="row">
                                <div className="col-sm-3">
                            <a href="/home" className="btn btn-primary"><i class="glyphicon glyphicon-menu-left"></i>
                                        Back to categories</a>
                                    </div>
                                <div className="col-sm-offset-4">
                                <h3><u>{this.props.cat_name}</u></h3>
                                </div>
                                </div>
                                <hr/>
                            <div> 
                                
                            {this.state.mess?
                                <div className="alert alert-success">{this.state.mess} 
                                    <a href="#" className="pull-right" data-dismiss="alert">X</a>
                                </div>: ""}
                                </div>
                            <label>{this.state.no_recipe}</label>
                            <div className="row">
                                { recipes.map((recipe) => (
                                            <div className="col-sm-3">
                                            <div className="panel panel-default" >
                                            <div className="panel-heading">
                                                <h3 className="text-center">{recipe.recipe_name}</h3>
                                            </div>
                                            <div className="panel-body">
                                            <div>Date created: {recipe.date_created.substring(0, 17)} at {recipe.date_created.substring(17, 25)}</div>
                                            <hr/>
                                            <div>Date Updated: {recipe.date_created.substring(0, 17)} at {recipe.date_created.substring(17, 25)}</div>
                                            </div>
                                            <div className="panel-footer">
                                            <div className="row">
                                            <a href="#" className="btn btn-default col-sm-3 action_buttons"  data-toggle="modal" data-target={`#view_procedure${recipe.id}`}>
                                                <span className="glyphicon glyphicon-folder-open"></span></a>
                                            <a href="#" className="btn btn-success col-sm-3 action_buttons" data-toggle="modal" data-target={`#edit_recipe${recipe.id}`}>
                                                <span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#" className="btn btn-danger col-sm-3 action_buttons"  data-toggle="modal" data-target={`#delete_recipe${recipe.id}`}>
                                                <span className="glyphicon glyphicon-trash"></span></a>
                                            </div>
                                            </div>
                                            </div>
                                    <EditRecipe key={recipe.id} recipe_id={`edit_recipe${recipe.id}`} recipe= {recipe} 
                                        recipeAfterEdit={this.viewRecipesHandler} parent={this}/>
                                    <DeleteRecipe key={recipe.id} recipe_id={`delete_recipe${recipe.id}`} recipe= {recipe} 
                                        recipeAfterDelete={this.viewRecipesHandler} parent={this}/>
                                    <ViewProcedure key={recipe.id} recipe_id={`view_procedure${recipe.id}`} recipe= {recipe} 
                                     parent={this}/>
                                
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

export default Recipes;
