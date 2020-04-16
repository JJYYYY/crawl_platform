import React, { Component } from 'react'
import { Button } from "antd";
import './index.less'

export default class Create extends Component {
    render() {
        return (
            <div className="new">
                <Button size="middle" type="primary"  onClick={this.props.changeState}>新建</Button>
                <h4>点击按钮以新建一个爬虫项目</h4>
            </div>
        )
    }
}
