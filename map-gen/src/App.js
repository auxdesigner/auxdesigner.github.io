import React from "react";
import "./App.css";

var rows = [],
  houseblocks = [],
  cellTotal = 5, //6
  rowTotal = 5, //6
  houseWidth = 3,
  houseHeight = 4;

function randomItem(i) {
  return i[Math.floor(Math.random() * i.length)];
}

//generate all blocks
for (var row = 0; row <= rowTotal; row++) {
  rows.push([]);
  for (var cell = 0; cell <= cellTotal; cell++) {
    //add eligible blocks
    var eligibleRow = rowTotal + 1 - row >= houseHeight,
      eligibleCell = cellTotal + 1 - cell >= houseWidth;
    if (eligibleRow && eligibleCell) {
      houseblocks.push([row, cell]);
    }
    //add all blocks
    rows[row].push("land");
  }
}

//pick a block
var selectedBlock = randomItem(houseblocks),
  selectedRow = selectedBlock[0],
  selectedCell = selectedBlock[1];

//find the rest based on picked block
rows[selectedRow][selectedCell] = selectedRow + "-" + selectedCell;

for (var paintedRow = 0; paintedRow < houseHeight; paintedRow++) {
  for (var paintedCell = 0; paintedCell < houseWidth; paintedCell++) {
    rows[selectedRow + paintedRow][selectedCell + paintedCell] =
      paintedRow + "-" + paintedCell;
  }
}
console.log(rows);

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   //this.state = {};
  //   //this.changeTime = this.changeTime.bind(this);
  // }

  render() {
    var blocks = rows.map((row_item, row_index) => (
      <div className={"row"} key={row_index}>
        {row_item.map((cell_item, cell_index) => (
          <div className={"cell img-" + cell_item} key={cell_index}></div>
        ))}
      </div>
    ));

    return <div className="App">{blocks}</div>;
  }
}

export default App;
