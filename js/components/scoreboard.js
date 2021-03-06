import React, { Component, PropTypes } from 'react'
import CurrentThrow from './currentthrow'
import { Grid, Row, Col, Button } from 'react-bootstrap'

export default class Scoreboard extends Component {
    computeScore(player){
        const score = Object.keys(this.props.board).reduce((score, target)=>{
            const boardData = this.props.board[target];
            const value = boardData.value
            if(boardData[player] > 3){
                return score += ((boardData[player] - 3) * value)
            }else{
                return score;
            }
        }, 0)
        return score
    }
    onEndTurn(){
        this.props.onEndTurn();
    }
    render(){
        const player1Score = this.computeScore('player1');
        const player2Score = this.computeScore('player2');
        return (
            <Grid>
                <Row style = {{marginBottom: '10'}}>
                    <Col className = "score" md = {3}>
                        Player 1: {player1Score}
                    </Col>
                    <Col md = {6}>
                        <Button block onClick = {this.onEndTurn.bind(this)} bsStyle = 'warning'>
                            End Turn 
                        </Button>
                    </Col>
                    <Col className = "score" md = {3}>
                        Player 2: {player2Score}
                    </Col>
                </Row>
                <Row>
                    <Col md = {3}>
                        <CurrentThrow playerThrow = {this.props.currentThrow.player1} />
                    </Col>
                    <Col md= {6}>
                    </Col>
                    <Col>
                        <CurrentThrow playerThrow = {this.props.currentThrow.player2} />
                    </Col>
               </Row>
            </Grid>
        )
    }
}

Scoreboard.propTypes = {
    board: PropTypes.object.isRequired
}
