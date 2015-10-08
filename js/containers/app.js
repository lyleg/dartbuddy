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
    const boardData = [{displayName: '20', value: 20, maxPerThrow: 3},//consolidate with board data in reducer
        {displayName: '19', value: 19, maxPerThrow: 3},
        {displayName: '18', value: 18, maxPerThrow: 3},
        {displayName: '17', value: 17, maxPerThrow: 3},
        {displayName: '16', value: 16, maxPerThrow: 3},
        {displayName: '15', value: 15, maxPerThrow: 3},
        {displayName: 'bullseye', value: 25, maxPerThrow: 2}]


    return boardData.map((target, key)=>{
        return  (
            <Row style = {{marginBottom: '20', border: '1px solid'}}>
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
    const { dispatch, board } = this.props
    const boardUI = this.buildBoard();
    return (
      <div>
        <Scoreboard onEndTurn = {this.onEndTurn.bind(this)}board = {board} />
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
    board: state.board
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
