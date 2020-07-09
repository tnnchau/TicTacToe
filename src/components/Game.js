import React from "react";
import Board from "./Board";

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          isAscending: true }],
  
        stepNumber: 0,
        xIsNext: true };
  
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const locations = [
        [1, 1],
        [2, 1],
        [3, 1],
        [1, 2],
        [2, 2],
        [3, 2],
        [1, 3],
        [2, 3],
        [3, 3]
      ];
  
      if (calculateWinner(squares).winner || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares, location: locations[i] }]),
  
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext });
  
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0 });
  
    }
  
    handleSortToggle() {
      this.setState({
        isAscending: !this.state.isAscending });
  
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winInfo = calculateWinner(current.squares);
      const winner = winInfo.winner;
      const isAscending = this.state.isAscending;
  
      let moves = history.map((step, move) => {
        const desc = move ?
        `Go to step #${move} : col ${history[move].location[0]} - row 
            ${history[move].location[1]}` :
        `Go back to start`;
  
        return (
          <li key={move}> 
            <button
              className={move === this.state.stepNumber ? 'move-list-item-selected' : ''}
              onClick={()=>this.jumpTo(move)}
            >
              {desc}        
            </button>
          </li>
        );
        }
      );
          
  
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        if (winInfo.isDraw) {
          status = "Draw";
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
      }
  
      if (!isAscending) {
        moves.reverse();
      }
  
      return (
        <div className="game">
        <div className="game-board"> 
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winLine={winInfo.line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.handleSortToggle()}>
            {isAscending ? 'Descending' : 'Ascending'}
            </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
    const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          line: lines[i],
          isDraw: false };
  
      }
    }
    let isDraw = true;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        isDraw = false;
        break;
      }
    }
    return {
      winner: null,
      line: null,
      isDraw: isDraw };
  }
export default Game;
