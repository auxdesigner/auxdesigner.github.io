import React from "react";
//import logo from "./logo.svg";
import "./App.css";

var rows = [],
  asset = ["grass", "cow", "dog"],
  cellTotal = 3, //4
  rowTotal = 3, //4
  houseWidth = 3,
  houseHeight = 2;

//generate all blocks
for (var row = 0; row <= rowTotal; row++) {
  rows.push([]);
  for (var cell = 0; cell <= cellTotal; cell++) {
    var eligibleRow = rowTotal + 1 - row >= houseHeight,
      eligibleCell = cellTotal + 1 - cell >= houseWidth;
    if (eligibleRow && eligibleCell) {
      rows[row].push("YES");
      //todo: add eligble cells to an array, and append image logic to set the adjacent arrays
    } else {
      rows[row].push(randomItem(asset));
    }
  }
}
console.log(rows);

function randomItem(i) {
  return i[Math.floor(Math.random() * i.length)];
}

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   //this.state = {};
  //   //this.changeTime = this.changeTime.bind(this);
  // }

  render() {
    var blocks = rows.map((row_item, row_index) => (
      <div className={"row " + row_index} key={row_index}>
        {row_item.map((cell_item, cell_index) => (
          <div className={"cell " + cell_item} key={cell_index}>
            {cell_item}
          </div>
        ))}
      </div>
    ));

    return <div className="App">{blocks}</div>;
  }
}

export default App;
