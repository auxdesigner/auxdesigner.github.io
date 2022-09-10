import React from "react";
import pic from "./head.jpg";
import "./App.css";
import moment from "moment";
import TextField from "@material-ui/core/TextField";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTime: "07:00",
      afterMinTime1: "09:00 AM",
      afterMinTime2: "11:30 AM",
      beforeMinTime1: "11:00 PM",
      beforeMinTime2: "01:30 AM",
    };
    this.changeTime = this.changeTime.bind(this);
  }

  changeTime(event) {
    const defaultTime = moment(event.target.value, "hh:mm A");
    const tempMinTime1 = moment(defaultTime).subtract(2, "hours");
    const tempMinTime2 = moment(defaultTime).subtract(90, "minutes");

    const afterMinTime1 = moment(tempMinTime1)
      .add(4, "hours")
      .format("hh:mm A");
    const afterMinTime2 = moment(tempMinTime2)
      .add(6, "hours")
      .format("hh:mm A");

    const beforeMinTime1 = moment(tempMinTime1)
      .subtract(6, "hours")
      .format("hh:mm A");
    const beforeMinTime2 = moment(tempMinTime2)
      .subtract(4, "hours")
      .format("hh:mm A");

    this.setState({
      defaultTime: event.target.value,
      afterMinTime1: afterMinTime1,
      afterMinTime2: afterMinTime2,
      beforeMinTime1: beforeMinTime1,
      beforeMinTime2: beforeMinTime2,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>"A knob you can turn for shifting your clock"</h1>
        <img src={pic} alt="pic" />
        <h2>When do you usually wake up?</h2>
        <TextField
          id="time"
          label=""
          type="time"
          color="primary"
          variant="outlined"
          autoFocus={true}
          defaultValue={this.state.defaultTime}
          inputProps={{
            step: 900, // 15 min
          }}
          onChange={this.changeTime}
        />
        <p>
          <b>To wake up earlier:</b> Light/exercise/feeding during&nbsp;
          {this.state.afterMinTime1} - {this.state.afterMinTime2}
          <br />
          <br />
          <b>To wake up later:</b> Light/exercise/feeding during&nbsp;
          {this.state.beforeMinTime1} - {this.state.beforeMinTime2}
        </p>
        <h4>
          Learn more about temperature minimum and sleep in the{" "}
          <a
            href="https://www.instagram.com/p/CKWiRVJHVwC/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram post
          </a>{" "}
          or{" "}
          <a
            href="https://www.youtube.com/watch?v=NAATB55oxeQ"
            target="_blank"
            rel="noreferrer"
          >
            the podcast
          </a>
        </h4>
      </div>
    );
  }
}

export default App;
