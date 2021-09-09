import React from "react";
//import logo from "./logo.svg";
import "./App.css";

var blocks = [],
  rows = [],
  cells = [],
  //asset = ["house", "grass", "cow"],
  cellTotal = 3,
  rowTotal = 3,
  houseWidth = 3,
  houseHeight = 2;

//generate all blocks
for (var row = 0; row <= rowTotal; row++) {
  rows.push([]);
  for (var cell = 0; cell <= cellTotal; cell++) {
    rows[row].push([row + "-" + cell]);
  }
}
console.log(rows);
// for (var row = 1; row <= rowTotal; row++) {
//   if (rowTotal - row + 1 >= houseHeight) {
//     for (var cell = 1; cell <= cellTotal; cell++) {
//       if (cellTotal - cell + 1 >= houseWidth) {
//         blocks.push("+" + row + "-" + cell);
//       } else {
//         blocks.push(row + "-" + cell);
//       }
//     }
//   } else {
//     for (cell = 1; cell <= cellTotal; cell++) {
//       blocks.push(row + "-" + cell);
//     }
//   }
// }

//find eligible blocks

// function randomItem(i) {
//   return Math.floor(Math.random() * i.length);
// }

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   //this.state = {};
  //   //this.changeTime = this.changeTime.bind(this);
  // }

  render() {
    var rowsDiv = rows.map((row_item, row_index) => (
      <div className={"row " + row_index} key={row_index}>
        {row_item.map((cell_item, cell_index) => (
          <div className={"cell " + cell_index} key={cell_index}>
            {cell_item}
          </div>
        ))}
      </div>
    ));

    return <div className="App">{rowsDiv}</div>;
  }
}

export default App;
