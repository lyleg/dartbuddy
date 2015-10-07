import React, {Component, PropTypes} from 'react'
import Objective from './objective'

export default class ObjectivesList extends Component{
    render(){
        return (
            <ul>
                {this.props.objectives.map((objective, index) =>
                                           <Objective {...objective} key = {index} />
                                           )}
            </ul>
        )
    }
}

