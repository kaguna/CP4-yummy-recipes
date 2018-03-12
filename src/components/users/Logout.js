import React,{Component} from 'react'

class Logout extends Component{
    logoutHandler = () => {
        window.localStorage.clear();
        this.props.history.push("/Login")

    };
    componentDidMount() {
        this.logoutHandler();
    }
    render(){
        return (
            <span>
                logging out...
            </span>
        );
    }
}
export default Logout