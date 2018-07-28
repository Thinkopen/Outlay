import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
	  <App>
		  <Route exact path='/' component={Home}/>
	  </App>
    </Router>
,document.getElementById('root'));

registerServiceWorker();
