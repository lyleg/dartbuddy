import React, { PropTypes, Component} from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import Marks from './marks'

class Board extends Component{
  buildBoard(){
    const { board } = this.props
        return Object.keys(board).sort((a,b)=>{return board[a].priority-board[b].priority}).map((targetKey, index)=>{
            const target = board[targetKey];
            return  (
                <Row key = {index} style = {{marginBottom: '20', border: '1px solid'}}>
                    <Col md = {3}>
                        <Marks player = {1} board = {board} target = {target.displayName} />
                    </Col>
                    <Col md = {6}>
                        <Button onClick = {score => {
                            this.props.onClick(target.displayName)
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
    render(){
        const board = this.buildBoard()    
        return (
            <Grid>
                {board}
            </Grid>
        )  
    }
}

export default Board
