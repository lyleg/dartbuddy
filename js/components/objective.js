import React, { Component, PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
export default class Objective extends Component {
    render(){
        return (
            <Panel>
                {this.props.text}
            </Panel>
        )
    }
}

Objective.propTypes = {
    text: PropTypes.string.isRequired
}
