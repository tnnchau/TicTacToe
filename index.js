function Square(props) {
    const className = 'square' + (props.highlight ? ' highlight' : ''); // highlight winner
    return (
      React.createElement("button", {
        className: className,
        onClick: props.onClick },
      props.value));
  
  
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      const winLine = this.props.winLine; //highlight winner
      return (
        React.createElement(Square, {
          key: i //key for creating board with loops
          , value: this.props.squares[i],
          onClick: () => this.props.onClick(i),
          highlight: winLine && winLine.includes(i) //highlight winner 
        }));
  
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
        squares.push(React.createElement("div", { className: "board-row", key: i }, row));
      }
      return (
        React.createElement("div", null, squares));
  
    }}
  
  
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
      [3, 3]];
  
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
          React.createElement("li", { key: move },
          React.createElement("button", {
            className: move === this.state.stepNumber ? 'move-list-item-selected' : '' //bold the selected item
            , onClick: () => this.jumpTo(move) }, desc)));
  
  
  
      });
  
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
        React.createElement("div", { className: "game" },
        React.createElement("div", { className: "game-board" },
        React.createElement(Board, {
          squares: current.squares,
          onClick: i => this.handleClick(i),
          winLine: winInfo.line })),
  
  
        React.createElement("div", { className: "game-info" },
        React.createElement("div", null, status),
        React.createElement("button", { onClick: () => this.handleSortToggle() },
        isAscending ? 'Descending' : 'Ascending'),
  
        React.createElement("ol", null, moves))));
  
  
  
    }}
  
  
  // =======================================
  ReactDOM.render(
  React.createElement(Game, null),
  document.getElementById('root'));
  
  
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