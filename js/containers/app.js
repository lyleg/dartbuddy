import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addScore, endTurn } from '../actions'
import  Scoreboard from '../components/scoreboard'
import  Marks from '../components/marks'
import { Grid, Button, Row, Col } from 'react-bootstrap'
import Process from '../process'
const process = new Process()

class App extends Component {
  buildBoard(){
    const { dispatch, board } = this.props

    return Object.keys(board).sort((a,b)=>{return board[a].priority-board[b].priority}).map((targetKey, index)=>{
        const target = board[targetKey];
        return  (
            <Row key = {index} style = {{marginBottom: '20', border: '1px solid'}}>
                <Col md = {3}>
                    <Marks player = {1} board = {board} target = {target.displayName} />
                </Col>
                <Col md = {6}>
                    <Button onClick = {score => {
                        dispatch(addScore(target.displayName))
                        }} bsSize = "large" block> {target.displayName} 
                    </Button>
                </Col>
                <Col md = {3}>
                    <Marks target = {target.displayName} player = {2} board = {board} />
                </Col>
            </Row>
        )              
    })   
  }
  onEndTurn(){
    const { board, dispatch } = this.props
    const newBoard = process.calculateComputerTurn(board)
    dispatch(endTurn(newBoard))
  }
  render() {
    // Injected by connect() call:
    const { dispatch, board, currentThrow } = this.props
    const boardUI = this.buildBoard();
    return (
      <div>
        <Scoreboard currentThrow = {currentThrow} onEndTurn = {this.onEndTurn.bind(this)}board = {board} />
        <Grid>
            {boardUI}
       </Grid>
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
