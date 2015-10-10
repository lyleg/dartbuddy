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
        displayName: 'bullseye',
        value: 25,
        maxPerThrow: 2

    }   
    
};

//todo, end game 
//


function board(state = initialBoard, action){
    const newBoard = merge({}, state);
    switch(action.type){
        case types.ADD_SCORE:
            //ensure <= 9 moves
           newBoard[action.target] = merge({}, state[action.target], {player1: state[action.target].player1 + 1})
           return newBoard
        break
        case types.END_TURN:
            return merge({},newBoard,action.newBoard)
        break
        default:
            return state
    }
    
}

/*
function throwLabelBuild(){

}

function game(state = initialGame, action){
    switch(action.type){
        case types.ADD_SCORE:
            //return merge({}, state.game.log, {player1: state.game.log})
        break
        case types.END_TURN:
            //append player 1 to log, take new stuff
        break;
        default:
            return state
    }

}
*/

const dartBuddyApp = combineReducers({
  board
})

export default dartBuddyApp
