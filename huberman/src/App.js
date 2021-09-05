import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: "07:00"};
    this.changeTime = this.changeTime.bind(this);
  }


  changeTime(event){
    console.log(event.target.value);
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>It is {this.state.value}.</h2>
        <TextField
          id="time"
          label="Alarm clock"
          type="time"
          defaultValue={this.state.value}
          inputProps={{
            step: 900, // 5 min
          }}
          onChange={this.changeTime}
        />
      </div>
    );
  }
}

export default App;
