import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Footer from './footer';
import Logo from './logo';
import axios from 'axios';




class Login extends Component {
     constructor(props){
        super(props);
    }


    render() {

        return (
        <div className="row">
            <div className="login-wrapper column col-md-12">            
                <Logo /> <br/><br/>
                <div className="login-text"> Login with a Google account</div>
                <Button className="login-button btn btn-success" onClick={this.gotoAuthenticate}>Login</Button>
                <Footer />              
            </div>
            
        </div>
        );

    }

    gotoAuthenticate(){

        //TODO fix google auth redirection
        axios.post('/googleauth');
    }

}
export default Login;