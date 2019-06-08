import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Home from './home'
import Tictactoe from './tic-tac-toe'
import Dicerace from './dice-race'

const routing = (
  <Router>
    <div>
    <h1>Azure Deployment Test</h1>
    <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/tic-tac-toe">Tic Tac Toe</Link>
        </li>
        <li>
          <Link to="/dice-race">Dicerace</Link>
        </li>
      </ul>
      <Route exact path="/" component={Home}/>
      <Route path="/tic-tac-toe" component={Tictactoe} />
      <Route path="/dice-race" component={Dicerace} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

//ReactDOM.render(<Tictactoe />, document.getElementById('root'))
