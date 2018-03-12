import React, { Component } from 'react';
import axios from 'axios'
import Home from './home';
class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {password:"", retyped_password: ""}
    }

    inputHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    change_password_handler = (event) => {
        const {password, retyped_password} = this.state;
        const header = {headers:{'x-access-token': window.localStorage.getItem('token')},
            content_type: 'application/json'};
        event.preventDefault();
        let email= window.localStorage.getItem("email")
        console.log(email)
        axios.put("http://127.0.0.1:5000/auth/reset_password", {email, password, retyped_password}, header)
            .then(response => {
                this.setState({mess: response.data.message, error: "",});
            })
            .catch(error => {
                if (error.response) {
                    this.setState({error: error.response.data.message, mess: ""});
                    console.log(error.response)
                } else if (error.request) {
                    this.setState({error:"Can't connect to the server.Please check your connection and try again.", mess: ""});
                }
            });
    };
    render() {
        return (
            <div className="modal fade" id="changepassword" tabindex = "-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
           <div className="modal-dialog" role="document">
               <div className="modal-content">
                   <div class="modal-header">
                       <h5 className="modal-title" id="exampleModalLongTitle">Change password here</h5>
                       <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                       </button>
                   </div>
                   <div className="modal-body">
                   {this.state.mess?
                                <div className="alert alert-success">{this.state.mess}</div>: ""}
                                {this.state.error?
                                <div className="alert alert-danger">{this.state.error}</div>: ""}

                       <form className="form-horizontal"  onSubmit={this.change_password_handler}>
                           <div className="form-group">
                               <label className="control-label col-sm-2">New password:</label>
                               <div className="col-sm-10">
                                   <input type="password" name="password" className="form-control" placeholder="Enter new password" 
                                    value={this.state.password} onChange={this.inputHandler}/>
                               </div>
                            </div>
                            <div className="form-group">
                               <label className="control-label col-sm-2">Confirm Password:</label>
                               <div className="col-sm-10">
                                   <input type="password" name="retyped_password" className="form-control" placeholder="Confirm paswword" 
                                    value={this.state.retyped_password} onChange={this.inputHandler}/>
                               </div>
                           </div>
                           <div className="modal-footer">
                               <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                               <button type="submit" className="btn btn-primary">Change password</button>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
       </div>
        );
    }
}
export default ChangePassword;
