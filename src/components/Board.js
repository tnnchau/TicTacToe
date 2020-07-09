import React from "react";
import Square from "./Square";

class Board extends React.Component {
    renderSquare(i) {
      const winLine = this.props.winLine; //highlight winner
      return (
       <Square
        key={i}
        value={this.props.squares[i]}
        onClick={()=>this.props.onClick(i)}
        highlight={winLine && winLine.includes(i)}
        />
      );
    }
  
    render() {
      //using loops to create board 
      const boardSize = 3;
      let squares = [];
      for (let i = 0; i < boardSize; ++i) {
        let row = [];
        for (let j = 0; j < boardSize; ++j) {
          row.push(this.renderSquare(i * boardSize + j));
        }
      squares.push(<div className="board-row" key={i}>{row}</div>);
      }
      return (
      <div>{squares}</div>
      )
    }
  }

  export default Board;