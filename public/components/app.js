import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './login';
import Footer from './footer';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (      
      <BrowserRouter> 
        <div>             
          <Route path="/" component={Login} exact />
        </div>    
      </BrowserRouter>  
     
    );
  }
}

export default App;