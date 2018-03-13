import React, { Component } from 'react';
import {panel_details, category_buttons } from '../../App.css';
class Viewprocedure extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="modal fade" id={this.props.recipe_id} tabindex = "-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
           <div className="modal-dialog" role="document">
               <div className="modal-content">
                   <div class="modal-header">
                       <h5 className="modal-title" id="exampleModalLongTitle">Procedure for preparing {this.props.recipe.recipe_name}</h5>
                       <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                       </button>
                   </div>
                   <div className="modal-body">
                        <div className="procedure">
                        {this.props.recipe.recipe_description}
                        </div>
                   </div>
                   <div className="modal-footer">
                        <button className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
               </div>
           </div>
       </div>
        );
    }
}
export default Viewprocedure;
