import { combineReducers } from 'redux'
import * as types  from './constants/actiontypes'
import merge from 'lodash/object/merge'


const initialGame = {
    round: 1,
    currentThrow: {
        player1: {
            20:0, 19:0, 18: 0, 17: 0, 16: 0, 15:0, 'bullseye': 0
        },
        player2: {
            20:0, 19:0, 18: 0, 17: 0, 16: 0, 15:0, 'bullseye': 0
        }
    }
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


function board(state = initialBoard, action){//probably move board to state.game.board
    const newBoard = merge({}, state);
    switch(action.type){
        case types.ADD_SCORE://hardcoded for player 1 scores with p2 being computer
            if(state[action.target].player2 < 3){
                newBoard[action.target] = merge({}, state[action.target], {player1: state[action.target].player1 + 1})
            }
           return newBoard
        break
        case types.END_TURN:
            return merge({},newBoard,action.results.newBoard)
        break
        default:
            return state
    }
    
}

function game(state = initialGame, action){
    //not clearing player 2 throw correctly, really no reason to have initialgame current throw so built out
    let player1, player2, currentThrow
    switch(action.type){//clean up all these merges
        case types.ADD_SCORE:
            player1 = merge({},state.currentThrow.player1)
            player1[action.target] = player1[action.target] + 1
            player2 = {} 
            currentThrow = merge({},state.currentThrow,{player1: player1, player2: player2})
            return merge({}, state, {currentThrow: currentThrow})
        break
        case types.END_TURN:
            player1 = initialGame.currentThrow.player1
            player2 = action.results.totalHits.reduce((currentThrow,hit)=>{
                currentThrow[hit] = currentThrow.hasOwnProperty(hit) ? currentThrow[hit] + 1 : 1
                return currentThrow
            },{})
            currentThrow = merge({}, state.currentThrow, {player1: player1, player2: player2})
            return merge({}, state, {currentThrow: currentThrow})
            //append player 1 to log, take new stuff
        break;
        default:
            return state
    }

}

const dartBuddyApp = combineReducers({
  board,
  game
})

export default dartBuddyApp
