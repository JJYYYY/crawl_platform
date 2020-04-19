import React, { Component } from 'react'
import {Button} from 'antd'
import './index.less'


export default class DebugButton extends Component {
    render() {
        return (
               <Button className="debug-button"
                   onClick={this.props.onClick}
                   size="middle"
                   style={{width:this.props.width}}
                   type="primary"
               >{this.props.text}</Button>
        )
    }
}
