import React, { Component } from 'react'
import { Button } from "antd";
import './index.less'

export default class Create extends Component {
    render() {
        return (
            <div className="new">
                <Button size="large" type="primary"  onClick={this.props.changeState} className='create-new'>新建</Button>
                <h2>点击按钮以新建一个爬虫项目</h2>
            </div>
        )
    }
}
