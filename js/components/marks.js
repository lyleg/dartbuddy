import React, { Component, PropTypes } from 'react'



class Marks extends Component{
    render(){
        const { target, board, player } = this.props
        let mark = '';
        let markClass = 'markScore';
        if(board[target]['player'+player] === 1){
            mark = '/'
        }
        else if(board[target]['player'+player] >= 2){
            mark = 'X'
        }
        if(board[target]['player'+player] >= 3){
           markClass +=' closedTarget'
        }
        
        return (<div className = {markClass}>
                    {mark}
                </div>);
    }   

}

export default Marks
