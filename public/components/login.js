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
            <Button bsStyle="success">Login</Button>
            <Footer />
        </div>
        );

    }

}
export default Login;