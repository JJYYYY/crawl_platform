import React, { Component } from 'react'
import { Input} from 'antd';
import DetermineButton from '../determineButton'
import DebugButton from '../debugButton'
import './index.less'

export default class GetRequest extends Component {
    state={
        requestGetActive:false
    }
    handleClick=()=>{
        let state=!this.state.requestGetActive
        this.setState({
            requestGetActive:state
        })
    }
    render() {
        return (
            <div className="crawl-first-request-get-item">
                <div className="crawl-first-request-get-url"><span>URL格式:</span>
                <Input className="crawl-first-request-get-url-input"
                    disabled={this.state.requestGetActive}
                    placeholder="url格式,占位符%s"
                />
                </div>
                <div className="crawl-first-request-get-num"><span>开始参数</span>
                <Input className="crawl-first-request-get-num-input"
                    disabled={this.state.requestGetActive}
                />
                <span>结束参数</span>
                <Input  className="crawl-first-request-get-num-input"
                    disabled={this.state.requestGetActive}
                />
            </div>
            <div className="crawl-first-request-button">
            <DetermineButton
                onClick={this.handleClick}
                text={this.state.requestPostActive ? '编辑' :'确定'}
            />
            <DebugButton
                text="调试"
            /></div>
            </div>
        )
    }
}
