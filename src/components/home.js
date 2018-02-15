import React, { Component } from 'react';
import {panel_details, category_buttons } from '../App.css'
import Header from './navbar'
class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
            <div className="container">
                <div className="panel_details">
                    <div className="col-sm-14">
                        <div className="panel panel-info">
                            <div className="panel-heading">

                                <div className="col-sm-9"><span className="glyphicon glyphicon-list"></span> Category List</div>
                                    <div className="col-sm-offset-2">
                                        <form className="navbar-form" role="search">
                                            <div className="input-group add-on col-sm-12">
                                                <input type="text" className="form-control" placeholder="Search for a category..." name="srch-term"/>
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-default" type="submit">
                                                            <i class="glyphicon glyphicon-search"></i></button>
                                                    </div>
                                            </div>
                                        </form>
                                    </div>
                            </div>
                            <div className="panel-body">

                                <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <input type="checkbox" id="checkbox" />
                                            <label for="checkbox">
                                                List group item heading 1
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#"><span class="glyphicon glyphicon-trash"></span></a>
                                            <a href="#"><span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#"><span class="glyphicon glyphicon-eye-open"></span></a>
                                        </span>
                                    </span>
                                    </span>
                                </div>

                                <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <input type="checkbox" id="checkbox" />
                                            <label for="checkbox">
                                                List group item heading
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#" className="trash"><span class="glyphicon glyphicon-trash"></span></a>
                                            <a href="#"><span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#" className="flag"><span class="glyphicon glyphicon-eye-open"></span></a>
                                        </span>
                                    </span>
                                    </span>
                                </div>

                                <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <input type="checkbox" id="checkbox" />
                                            <label for="checkbox">
                                                List group item heading
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#" className="trash"><span class="glyphicon glyphicon-trash"></span></a>
                                            <a href="#"><span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#" className="flag"><span class="glyphicon glyphicon-eye-open"></span></a>
                                        </span>
                                    </span>
                                    </span>
                                </div>

                                <div className="list-group">
                                    <span className="list-group-item">
                                        <span className="checkbox">
                                            <input type="checkbox" id="checkbox" />
                                            <label for="checkbox">
                                                List group item heading
                                            </label>
                                        <span className="category_buttons action-buttons">
                                            <a href="#" className="trash"><span class="glyphicon glyphicon-trash"></span></a>
                                            <a href="#"><span className="glyphicon glyphicon-pencil"></span></a>
                                            <a href="#" className="flag"><span class="glyphicon glyphicon-eye-open"></span></a>
                                        </span>
                                    </span>
                                    </span>
                                </div>

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
                                            <li className="active"><a href="javascript:void(0)">1 <span className="sr-only">(current)</span></a></li>
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

export default Home;
