import React, { Component } from 'react'
import {Button} from 'antd'

export default class SelectButton extends Component {
    render() {
        return (
            <div className="select-button">
            <Button onClick={this.props.onClick}
                size="middle"
                style={{width:this.props.width}}
                type="primary"
            >{this.props.text}</Button>
            </div>
        )
    }
}
