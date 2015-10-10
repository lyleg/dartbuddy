import React, { PropTypes, Component} from 'react'



class CurrentThrow extends Component{
    
    buildThrowString(currentPlayerThrow){
       return Object.keys(this.props.playerThrow).reduce((throwString, playerThrow)=>{
            if(this.props.playerThrow[playerThrow]){
                throwString.push(this.props.playerThrow[playerThrow] + '-'  + playerThrow)
            }
            return throwString
        },[]).join(', ')

    }
    render(){
        const throwString = this.buildThrowString();

        return (
            <div>{throwString}</div>
        )
         
    }

}
/*
CurrentThrow.PropTypes = {
    currentThrow: PropTypes.currentThrow.object.isRequired,
    player: PropTypes.number.isRequired
}
*/
export default CurrentThrow
