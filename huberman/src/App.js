import React from 'react';
import pic from './head.jpg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTime: "07:00",
      earlyTime1: "01:00 AM",
      earlyTime2: "03:00 AM",
      lateTime1: "11:00 AM",
      lateTime2: "13:00 PM",
    };
    this.changeTime = this.changeTime.bind(this);
  }


  changeTime(event){
    const defaultTime = moment(event.target.value, "hh:mm A");
    const earlyTime1 = moment(defaultTime).subtract(6, 'hours').format('hh:mm A');
    const earlyTime2 = moment(defaultTime).subtract(4, 'hours').format('hh:mm A');
    const lateTime1 = moment(defaultTime).add(4, 'hours').format('hh:mm A');
    const lateTime2 = moment(defaultTime).add(6, 'hours').format('hh:mm A');

    this.setState({
      defaultTime: event.target.value,
      earlyTime1: earlyTime1,
      earlyTime2: earlyTime2,
      lateTime1: lateTime1,
      lateTime2: lateTime2
    });

  }

  render() {
    return (
      <div>
        <h1>Quote</h1>
        <img src={pic} alt="pic" />
        <h1>When do you usually wake up?</h1>
        <TextField
          id="time"
          label=""
          type="time"
          defaultValue={this.state.defaultTime}
          inputProps={{
            step: 900, // 15 min
          }}
          onChange={this.changeTime}
        />
        <h2>Early: It is {this.state.earlyTime1} to {this.state.earlyTime2}.</h2>
        <h2>Late: It is {this.state.lateTime1} to {this.state.lateTime2}.</h2>
        <h3>Link</h3>
      </div>
    );
  }
}

export default App;
