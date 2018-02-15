import React, { Component } from 'react';
import {panel_details, category_buttons } from '../App.css'
import Header from './navbar'

class Categories extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="panel_details">
                        <div className="col-sm-14">
                            <div className="panel panel-info">
                                <div className="panel-heading">

                                    <div className="col-sm-9"><span className="glyphicon glyphicon-list"></span>
                                        Category List <i className="badge badge-primary"> 25</i></div>
                                    <div className="col-sm-offset-2">
                                        <form className="navbar-form" role="search">
                                            <div className="input-group add-on col-sm-12">
                                                <input type="text" className="form-control" placeholder="Search
                                                for a category..." name="srch-term"/>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-default" type="submit">
                                                        <i className="glyphicon glyphicon-search"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="panel-body">

                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <div className="col-sm-6">
                                                <input type="email" className="form-control" placeholder="Enter
                                                Category name"/>
                                            </div>
                                            <div className="col-sm-6">
                                                <button type="submit" className="btn btn-default">
                                                    <i className="glyphicon glyphicon-plus"></i>  Create Category
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div><hr/></div>
                                    <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <label for="checkbox">
                                                List group item heading 1
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#"><span class="glyphicon glyphicon-trash"
                                                              data-toggle="tooltip" data-placement="top"
                                                              title="Delete the category!"></span></a>
                                            <a href="#"><span className="glyphicon glyphicon-pencil"
                                            data-toggle="tooltip" data-placement="top"
                                                              title="Edit the category."></span></a>
                                            <a href="#"><span class="glyphicon glyphicon-eye-open"
                                                              data-toggle="tooltip" data-placement="top"
                                                              title="View recipes from this category."
                                            ></span></a>
                                        </span>
                                    </span>
                                    </span>
                                    </div>

                                    <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <label for="checkbox">
                                                List group item heading
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#" className="trash"><span class="glyphicon glyphicon-trash">

                                            </span></a>
                                            <a href="#"><span className="glyphicon glyphicon-pencil">

                                            </span></a>
                                            <a href="#" className="flag"><span class="glyphicon glyphicon-eye-open">

                                            </span></a>
                                        </span>
                                    </span>
                                    </span>
                                    </div>

                                    <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <label for="checkbox">
                                                List group item heading
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#" className="trash"><span class="glyphicon glyphicon-trash">

                                            </span></a>
                                            <a href="#"><span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#" className="flag"><span class="glyphicon glyphicon-eye-open">

                                            </span></a>
                                        </span>
                                    </span>
                                    </span>
                                    </div>

                                    <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <label for="checkbox">
                                                List group item heading
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#" className="trash"><span class="glyphicon glyphicon-trash">

                                            </span></a>
                                            <a href="#"><span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#" className="flag"><span class="glyphicon glyphicon-eye-open">

                                            </span></a>
                                        </span>
                                    </span>
                                    </span>
                                    </div>

                                    <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <label for="checkbox">
                                                List group item heading
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#" className="trash"><span class="glyphicon glyphicon-trash">

                                            </span></a>
                                            <a href="#"><span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#" className="flag"><span class="glyphicon glyphicon-eye-open">

                                            </span></a>
                                        </span>
                                    </span>
                                    </span>
                                    </div>

                                </div>
                                <div className="panel-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <ul className="pagination pagination-sm">
                                                <li className="disabled"><a href="javascript:void(0)">«</a></li>
                                                <li className="active"><a href="javascript:void(0)">1 <span
                                                    className="sr-only">(current)</span></a></li>
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
            </div>

        );
    }
}

export default Categories;
