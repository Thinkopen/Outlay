import React, { Component } from 'react';
import Login from './Login';
import Footer from './Footer';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("/")
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      

        <Footer>

        </Footer>
      
    );
  }
}

export default App;