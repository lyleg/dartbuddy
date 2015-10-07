import { combineReducers } from 'redux'
import * as types  from './constants/actiontypes'
import merge from 'lodash/object/merge'


const initialGame = {
    turn: 1,
    currentMarks:[]
}

const initialBoard = {
    20: {
        player1: 0,
        player2: 0,
        priority: 1,
        displayName: '20',
        value: 20,
        maxPerThrow: 3
    },
    19: {
        player1: 0,
        player2: 0,
        priority: 2,
        displayName: '19',
        value: 19,
        maxPerThrow: 3

    }, 
    18: {
        player1: 0,
        player2: 0,
        priority: 3,
        displayName: '18',
        value: 18,
        maxPerThrow: 3

    },
    17: {
        player1: 0,
        player2: 0,
        priority: 4,
        displayName: '17',
        value: 17,
        maxPerThrow: 3

    }, 
    16: {
        player1: 0,
        player2: 0,
        priority: 5,
        displayName: '16',
        value: 16,
        maxPerThrow: 3

    },
    15: {
        player1: 0,
        player2: 0,
        priority: 6,
        displayName: '15',
        value: 15,
        maxPerThrow: 3

    },
    'bullseye': {
        player1: 0,
        player2: 0,
        priority: 7,
        displayName: '20',
        value: 25,
        maxPerThrow: 3

    }   
    
};

//todo, end game 
//
function calculateHighestTarget(board, player){
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

function calculateComputerThrow(board){//not pure, move out of reducer!!!
    const hits = [];
    let {target, maxMarks} = calculateHighestTarget(board, 2)
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

function board(state = initialBoard, action){
    const newBoard = merge({}, state);
    switch(action.type){
        case types.ADD_SCORE:
            //ensure <= 9 moves
           newBoard[action.target] = merge({}, state[action.target], {player1: state[action.target].player1 + 1})
           return newBoard
        break
        case types.END_TURN:
            for (let i = 0; i < 3; i++){
                const hits = calculateComputerThrow(newBoard);
                if(hits.length > 0){
                    const targetHit = hits[0];
                    newBoard[targetHit] = merge({},newBoard[targetHit], {player2: newBoard[targetHit].player2 + hits.length})
                }
           } 
            return newBoard;
        break
        default:
            return state
    }
    
}

function game(state = initialGame, action){
    switch(action.type){
        default:
            return state
    }

}


const dartBuddyApp = combineReducers({
  board,
  game
})

export default dartBuddyApp
