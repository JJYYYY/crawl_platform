import React, { Component } from 'react'
import {Button} from 'antd'
import './index.less'


export default class DeleteButton extends Component {
    render() {
        return (
            <div className="delete-button">
               <Button danger
                   onClick={this.props.onClick}
                   size="middle"
                   style={{width:this.props.width}}
                   type="primary"
               >{this.props.text}}</Button>
            </div>
        )
    }
}
