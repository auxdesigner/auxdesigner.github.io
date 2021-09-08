import React from "react";
//import logo from "./logo.svg";
import "./App.css";

var blocks = [],
  even = [],
  odd = [],
  cellTotal = 4,
  rowTotal = 4,
  houseWidth = 3,
  houseHeight = 2;

for (var i = 1; i <= cellTotal * rowTotal; i++) {
  blocks.push(i);
}

blocks.forEach((i) => {
  console.log(i);
  if (i % 2 === 0) {
    even.push(i);
  } else {
    odd.push(i);
  }
});

function randomItem(i) {
  return Math.floor(Math.random() * i.length);
}

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   //this.state = {};
  //   //this.changeTime = this.changeTime.bind(this);
  // }

  render() {
    //var blocksDiv = blocks.map((item) => <div key={item}> {item} </div>);
    var evenDiv = even.map((item) => (
      <div className="even" key={item}>
        {item}
      </div>
    ));
    var oddDiv = odd.map((item) => (
      <div className="odd" key={item}>
        {item}
      </div>
    ));

    return (
      <div className="App">
        {evenDiv}
        {oddDiv}
      </div>
    );
  }
}

export default App;
