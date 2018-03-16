import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import Toaster from './ToasterSuccess';
import Header from './NavBar';
import CreateCategory from '../components/categories/CreateCategory';
import EditCategory from '../components/categories/EditCategory';
import DeleteCategory from '../components/categories/DeleteCategory';
import axiosInstance from '../common/AxiosInstance';

let url = '/categories/';

class Home extends Component {
    state = {
      categories: [], items: '', current_page: '', pages: [],
    };
    inputHandler = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    viewCategoriesHandler = (value, page) => {
      this.setState({ categories: [], items: '' });
      if (value) {
        url = `${url}?q=${value}`;
      } else if (page) {
        url = `${url}?page=${page}`;
      }
      axiosInstance.get(url)
        .then((response) => {
          this.setState({
            categories: response.data.categories,
            items: response.data.total_items,
            pages: response.data.total_pages,
            current_page: response.data.current_page,
            noCategory: '',
          });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.message === 'no_categories') {
              this.setState({
                noCategory: 'Welcome to the Yummy recipes, create your first category and enjoy.',
                items: '0',
                successMessage: '',
                categories: [],
                pages: '',
              });
            } else if (error.response.data.message === 'no_category_on_search') {
              this.setState({
                noCategory: 'No category with such letters.',
                items: '0',
                successMessage: '',
                categories: [],
              });
            } else {
              this.setState({ errorMessage: error.response.data.message });
            }
          } else if (error.request) {
            this.setState({ errorMessage: 'Network error!', successMessage: '' });
          }
        });
      url = '/categories/';
    };
    paginationHandler = (page) => {
      this.viewCategoriesHandler(null, page);
    }
    searchHandler = (event) => {
      event.preventDefault();
      this.viewCategoriesHandler(event.target.value);
    }
    componentDidMount() {
      this.viewCategoriesHandler();
    }
    render() {
      const {
        categories, noCategory, items, pages, current_page,
        successMessage,
      } = this.state;
      const allPages = [];
      for (let i = 1; i <= pages; i++) {
        allPages.push(<Pagination.Item
          active={i === current_page}
          onClick={this.paginationHandler.bind(this, i)}
        >
          {i}
                      </Pagination.Item>);
      }
      return (
        <div id="all_categories">
          <Header />
          <Toaster />
          <CreateCategory categoryAfterCreation={this.viewCategoriesHandler} />
          <div className="container">
            <div className="col-sm-14">
              <div className="panel panel">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-sm-2">
                      <h5>
                        <i className="glyphicon glyphicon-list" /> Category List <span className="label label-info">{items}</span>
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
                                                for a category..."
                        />
                      </div>

                    </div>
                    <div className="col-sm-3">
                      <a
                        href="#createcategory"
                        data-toggle="modal"
                        className="btn btn-primary"
                        data-target="#createcategory"
                      ><i className="glyphicon glyphicon-plus" />
                                        Create Category
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
                  <label>{noCategory}</label>
                  <div className="row">
                    { categories.map(category => (
                      <div className="col-sm-3">
                        <div className="panel panel-default" >
                          <div className="panel-heading">
                            <h3 className="text-center">{category.category_name}</h3>
                          </div>
                          <div className="panel-body">
                            <div>Date created: {category.date_created.substring(0, 17)} at {category.date_created.substring(17, 25)}</div>
                            <hr />
                            <div>Date Updated: {category.date_updated.substring(0, 17)} at {category.date_updated.substring(17, 25)}</div>
                          </div>
                          <div className="panel-footer">
                            <div className="row">
                              <a href={`/category/${category.id}/recipes`} className="btn btn-default col-sm-3 action_buttons"><span className="glyphicon glyphicon-eye-open" /></a>
                              <a href="" className="btn btn-success col-sm-3 action_buttons" data-toggle="modal" data-target={`#edit_category${category.id}`}>
                                <span className="glyphicon glyphicon-pencil" />
                              </a>
                              <a href="" className="btn btn-danger col-sm-3 action_buttons" data-toggle="modal" data-target={`#delete_category${category.id}`}>
                                <span className="glyphicon glyphicon-trash" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <EditCategory
                          key={category.id}
                          category_id={`edit_category${category.id}`}
                          category={category}
                          categoryAfterEdit={this.viewCategoriesHandler}
                          parent={this}
                        />
                        <DeleteCategory
                          key={category.id}
                          category_id={`delete_category${category.id}`}
                          category={category}
                          categoryAfterDelete={this.viewCategoriesHandler}
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

export default Home;
