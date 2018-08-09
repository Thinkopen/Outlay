import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Footer from './footer';



class Login extends Component {
     constructor(props){
        super(props);
    }


    render() {

        return (
        <div>
            <div className="login-text"> Login with a Google account </div>
            <button className="btn btn-success">Login </button>
            <Footer />
        </div>
        );

    }

}
export default Login;