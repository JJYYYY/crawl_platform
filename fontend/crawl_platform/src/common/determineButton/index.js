import React, { Component } from 'react'
import {Button} from 'antd'
import './index.less'


export default class DetermineButton extends Component {
    render() {
        return (

               <Button onClick={this.props.onClick}
                   size="middle"
                   style={{width:this.props.width}}
                   type="primary"
               >{this.props.text}</Button>
        )
    }
}
