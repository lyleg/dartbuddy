import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addScore, endTurn } from '../actions'
import  Scoreboard from '../components/scoreboard'
import  Board from '../components/board'
import { Grid, Button, Row, Col } from 'react-bootstrap'
import Process from '../process'
const process = new Process()

class App extends Component {
  onEndTurn(){
    const { board, dispatch } = this.props
    const newBoard = process.calculateComputerTurn(board)
    dispatch(endTurn(newBoard))
  }
  render() {
    // Injected by connect() call:
    const { dispatch, board, currentThrow } = this.props
    return (
      <div>
        <Scoreboard currentThrow = {currentThrow} onEndTurn = {this.onEndTurn.bind(this)}board = {board} />
        <Board board = {board} onClick = {(target)=>{
            dispatch(addScore(target))
        }} />
      </div>
    );
  }
}

App.propTypes = {
}

function select(state) {
  return {
    board: state.board,
    currentThrow: state.game.currentThrow
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
