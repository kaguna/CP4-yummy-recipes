/**
 * This file displays all the recipes of a specific category.
 */
import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import Toaster from '../../common/ToasterSuccess';
import Header from '../../common/NavBar';
import CreateRecipe from './CreateRecipe';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import ViewProcedure from './ViewProcedure';
import axiosInstance from '../../common/AxiosInstance';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], noRecipe: '', items: '', successMessage: '', errorMessage: '' };
  }

    inputHandler = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value }); 
};

    viewRecipesHandler = (value, page) => {
      let url = `/category/${this.props.match.params.category_id}/recipes/`;
      if (value) {
        url = `${url}?q=${value}`;
      } else if (page) {
        url = `${url}?page=${page}`;
      }
      axiosInstance.get(url)
        .then((response) => {
          this.setState({
            recipes: response.data.recipes,
            items: response.data.total_items,
            pages: response.data.total_pages,
            currentPage: response.data.current_page,
            noRecipe: '' });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 402) {
              this.setState({ noRecipe: error.response.data.message,
                items: '',
                successMessage: '',
                errorMessage: '',
                recipes: [],
                pages: '' });
            } else if (error.response.status === 404) {
              this.setState({ noRecipe: 'No recipe with such letter(s).',
                items: '',
                successMessage: '',
                errorMessage: '',
                recipes: [] });
            } else {
              this.setState({ errorMessage: error.response.data.message, successMessage: '' });
            }
          } else if (error.request) {
            this.setState({ errorMessage: 'Network error!', successMessage: '' });
          }
        });
      url = `/category/${this.props.match.params.category_id}/recipes/`;
    };
    paginationHandler = (page) => {
      this.viewRecipesHandler(null, page);
    }
    searchHandler = (event) => {
      event.preventDefault();
      this.viewRecipesHandler(event.target.value);
    }
    componentDidMount() {
      this.viewRecipesHandler();
    }

    render() {
      const { recipes, items, pages, noRecipe, currentPage, successMessage } = this.state;
      const { category_id } = this.props.match.params;
      const allPages = [];
      for (let i = 1; i <= pages; i++) {
        allPages.push(<Pagination.Item
          active={i === currentPage}
          onClick={this.paginationHandler.bind(this, i)}
        >
          {i}
        </Pagination.Item>);
      }
      return (
        <div id="all_recipes">
          <Header />
          <Toaster />
          <CreateRecipe recipeAfterCreation={this.viewRecipesHandler} categoryId={category_id} />
          <div className="container">
            <div className="col-sm-14">
              <div className="panel panel">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-sm-2">
                      <h5>
                        <i className="glyphicon glyphicon-list" />
                                    Recipe List <span className="label label-info">{items}</span>
                      </h5>
                    </div>
                    <div className="col-sm-7">
                      <div className="form-group has-feedback has-search">
                        <span className="glyphicon glyphicon-search form-control-feedback" />
                        <input
                          type="text"
                          name="keywordSearch"
                          onChange={this.searchHandler}
                          className="form-control"
                          placeholder="Search
                                                for a recipe..."
                        />
                      </div>

                    </div>
                    <div className="col-sm-3">
                      <a
                        href="#create_recipe"
                        data-toggle="modal"
                        className="btn btn-primary"
                        data-target="#createRecipe"
                      ><i className="glyphicon glyphicon-plus" />
                                        Create Recipe
                      </a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <a href="/home" className="btn btn-primary"><i className="glyphicon glyphicon-menu-left" />
                                        Back to Categories
                      </a>
                    </div>
                  </div>
                  <hr />
                  <div>

                    {successMessage ?
                      <div className="alert alert-success">{successMessage}
                        <a href="" className="pull-right" data-dismiss="alert">X</a>
                      </div> : ''}
                  </div>
                  <label>{noRecipe}</label>
                  <div className="row">
                    { recipes.map(recipe => (
                      <div className="col-sm-3">
                        <div className="panel panel-default" >
                          <div className="panel-heading">
                            <h3 className="text-center">{recipe.recipe_name}</h3>
                          </div>
                          <div className="panel-body">
                            <div>Date created: {recipe.date_created.substring(0, 17)} at {recipe.date_created.substring(17, 25)}</div>
                            <hr />
                            <div>Date Updated: {recipe.date_updated.substring(0, 17)} at {recipe.date_updated.substring(17, 25)}</div>
                          </div>
                          <div className="panel-footer">
                            <div className="row">
                              <a href="" className="btn btn-default col-sm-3 action_buttons" data-toggle="modal" data-target={`#view_procedure${recipe.id}`}>
                                <span className="glyphicon glyphicon-folder-open" />
                              </a>
                              <a href="" className="btn btn-success col-sm-3 action_buttons" data-toggle="modal" data-target={`#edit_recipe${recipe.id}`}>
                                <span className="glyphicon glyphicon-pencil" />
                              </a>
                              <a href="" className="btn btn-danger col-sm-3 action_buttons" data-toggle="modal" data-target={`#delete_recipe${recipe.id}`}>
                                <span className="glyphicon glyphicon-trash" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <EditRecipe
                          key={recipe.id}
                          recipeId={`edit_recipe${recipe.id}`}
                          recipe={recipe}
                          recipeAfterEdit={this.viewRecipesHandler}
                          parent={this}
                        />
                        <DeleteRecipe
                          key={recipe.id}
                          recipeId={`delete_recipe${recipe.id}`}
                          recipe={recipe}
                          recipeAfterDelete={this.viewRecipesHandler}
                          parent={this}
                        />
                        <ViewProcedure
                          key={recipe.id}
                          recipeId={`view_procedure${recipe.id}`}
                          recipe={recipe}
                          parent={this}
                        />

                      </div>
                                   ))}
                  </div>
                </div>
                <div className="panel-footer bg-dark">
                  <Pagination>
                    <Pagination bsSize="large">{allPages}</Pagination>
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
