import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  componentDidMount() {
    fetch("/")
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
       Its a react-express app! {this.state.username}
      </div>
    );
  }
}

export default App;