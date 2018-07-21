import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./login.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Checkbox from "react-bootstrap/es/Checkbox";
import Route from "react-router-dom/es/Route";
import { withRouter } from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import saveToken from "./../../redux/ducks/login"
import PropTypes from 'prop-types';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email:"",
            password:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit() {
        // CHIAMATA PER LOGIN //
        const parametri = { email : this.state.email, password: this.state.password};
        const options = {
            method: 'post',
            data : parametri,
            url: 'https://reqres.in/api/login'
        };
        axios(options, this)
            .then((response) => {
                console.log(response);
                if(response.status === 200) {
                    console.log("Login successfull");
                    localStorage.setItem('token', response.data.token);
                    this.props.saveToken(true, response.data.token);
                    this.props.history.push('/welcome');
                }else if (response.status === 204){
                    console.log("Username password do not match");
                }else{
                    console.log("Username does not exists");
                }
            });
     }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox>Remember me</Checkbox>
                    </FormGroup>
                    <FormGroup>
                            <Button
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                onClick={this.handleSubmit}
                            >
                                Login
                            </Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    saveToken: PropTypes.func,
    loginData: PropTypes.object
};

function mapStateToProps(state) {
    return {
        loginData: state.loginData
    };
}

const mapDispatchToProps = dispatch => ({
    saveToken: (logged, token) => {
        dispatch(saveToken(logged, token));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
