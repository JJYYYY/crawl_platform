import React, { Component } from 'react'
import DetermineButton from '../determineButton'
import './index.less'

export default class Create extends Component {
    render() {
        return (
            <div className="new">
                {/* <Button className="create-new"
                    onClick={this.props.changeState}
                    size="large"
                    type="primary"
                >新建</Button> */}
                <DetermineButton onClick={this.props.changeState}
                    text="新建"
                />
                <h2>点击按钮以新建一个爬虫项目</h2>
            </div>
        )
    }
}
