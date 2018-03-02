import React,{Component} from 'react'

class Logout extends Component{
    logout_handler = () => {
        window.localStorage.clear();
        this.props.history.push("/login")

    };
    componentDidMount() {
        this.logout_handler();
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