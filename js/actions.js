import * as types  from './constants/actiontypes'
/*
 * action creators
 */


export function addScore(target) {
  return { type: types.ADD_SCORE, target }
}

export function endTurn(newBoard){
    return { type: types.END_TURN, newBoard } 
}


