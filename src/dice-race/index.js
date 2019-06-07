import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Racetrack extends React.Component {

  renderTrackUI(i)  {
    let squares = [];

    for (let j = i;; j++) {
      squares.push(
        <Square
          value={this.props.squares[j]}
          onClick={() => this.props.onClick(j)}
        />
      );
      if (j != 0 && ((j + 1) % 10) == 0)
        break;
    }

    return squares;
  }

  render()  {
    return(
      <div>
        <div className="board-row">
          {this.renderTrackUI(0)}
        </div>
        <div className="board-row">
          {this.renderTrackUI(10)}
        </div>
        <div className="board-row">
          {this.renderTrackUI(20)}
        </div>
      </div>
    );
  }
}

class Dicerace extends React.Component {

  constructor(props)  {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render()  {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return(
      <div>
          <h2>Dicerace</h2>
          <div className="game">
            <div class="mdc-select">
              <i class="mdc-select__dropdown-icon"></i>
              <select class="mdc-select__native-control" id="crane-state-input" required>
                <option value="" selected></option>
                <option value="AL">Alabama</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <label class="mdc-floating-label" for="crane-state-input">
                State
              </label>
              <div class="mdc-line-ripple"></div>
            </div>
            <div className="game-board">
              <Racetrack
                squares={current.squares}
                onClick={i => this.handleClick(i)}
              />
            </div>
          </div>
        </div>
    )
  }
}

function rollDice() {
  var min = 1;
  var max = 7;
  return Math.floor(Math.random() * (max - min)) + min;;
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Dicerace
