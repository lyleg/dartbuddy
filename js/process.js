//component has event, creates new board, new data sent to action and onto reducer
import merge from 'lodash/object/merge'

class Process{
    calculateHighestTarget(board, player){
        const opponent = (player === 1) ? 'player2' : 'player1';
        const target = Object.keys(board).sort((a,b)=>{
            return (board[a].priority - board[b].priority)
        }).find((number)=>{
            return (board[number].player1 < 3 || board[number].player2 < 3) // shoot for highest priority target not closed by both
        });
        //if player1 is closed, can only score up to your closing
        const maxMarks = (board[target][opponent] >= 3) ? (3 - board[target]['player' + player]) : 9//cant calculate this here, previous hits not on board yet!!
        return {
            target: target,
            maxMarks: maxMarks
        }
    }
    calculateComputerThrow(board){//not pure, move out of reducer!!!
        const hits = [];
        let {target, maxMarks} = this.calculateHighestTarget(board, 2)
        const odds = (target === 'bullseye') ? .8 : .6//20 percent for bullseye and 40 percent for other
        const hit = Math.random() > odds
        if(hit){//this whole bit is sloppy, move to function rework double / triple flow
            if(Math.random() > 0.9 && maxMarks >=2 ){//10 percent chance of throwing a double
                hits.push(target)  
            }else if(Math.random() > 0.9){//10 percent chance of a triple
                if(maxMarks >= 3 && target !== 'bullseye'){//get your two additional hits if you can
                    hits.push(target)
                    hits.push(target)
                }else if(maxMarks === 2){//get only one additional mark if that's all you are eligible for
                    hits.push(target)
                }
            }
            hits.push(target)
        }
       return hits
    }
    calculateComputerTurn(board){
        let totalHits = []
        for (let i = 0; i < 3; i++){
            const hits = this.calculateComputerThrow(board);
            totalHits = totalHits.concat(hits)
            if(hits.length > 0){
                const targetHit = hits[0];
                board[targetHit] = merge({},board[targetHit], {player2: board[targetHit].player2 + hits.length})
            }
       } 
        return {board:board, totalHits: totalHits}    
    }
}

export default Process
