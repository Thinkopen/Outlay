import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';



class Header extends Component {
    constructor(props){
        super(props);
    }

    render(){

        return(

            <header>
            <Navbar className="menu-navbar" /> 
            </header>

        );
    }




}