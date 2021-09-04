import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: "cat"};
    this.change = this.change.bind(this);
  }

  change(event){
      console.log(event.target.value);
      this.setState({value: event.target.value})
  }



  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <select id="pet-select" onChange={this.change} value={this.state.value}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
        </select>
        <h2>It is {this.state.value}.</h2>
      </div>
    );
  }
}

export default App;
