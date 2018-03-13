import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance'
import Home from './Home';
class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = { email: ""}
    }

    inputHandler = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    resetPasswordHandler = (event) => {
        const {email} = this.state;
        event.preventDefault();
        axiosInstance.post("/auth/send_reset_password_token", {email})
            .then(response => {
                this.setState({mess: response.data.message, error: "",});
            })
            .catch(error => {
                if (error.response) {
                    this.setState({error: error.response.data.message, mess: ""});
                } else if (error.request) {
                    this.setState({error:"Can't connect to the server.Please check your connection and try again.", mess: ""});
                }
            });
    };
    render() {
        return (
            <div className="modal fade" id="resetpassword" tabindex = "-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
           <div className="modal-dialog" role="document">
               <div className="modal-content">
                   <div class="modal-header">
                       <h5 className="modal-title" id="exampleModalLongTitle">Email login credetials</h5>
                       <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                       </button>
                   </div>
                   <div className="modal-body">
                   {this.state.mess?
                                <div className="alert alert-success">{this.state.mess}</div>: ""}
                                {this.state.error?
                                <div className="alert alert-danger">{this.state.error}</div>: ""}

                       <form className="form-horizontal"  onSubmit={this.resetPasswordHandler}>
                           <div className="form-group">
                               <label className="control-label col-sm-2">Email:</label>
                               <div className="col-sm-10">
                                   <input type="email" name="email" className="form-control" placeholder="Enter email" 
                                    value={this.state.email} onChange={this.inputHandler}/>
                               </div>
                           </div>
                           <div className="modal-footer">
                               <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                               <button type="submit" className="btn btn-primary">Send Email</button>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
       </div>
        );
    }
}
export default ResetPassword;
