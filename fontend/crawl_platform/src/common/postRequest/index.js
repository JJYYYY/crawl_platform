import React, { Component } from 'react'
import { Input} from 'antd';
import DetermineButton from '../determineButton'
import DebugButton from '../debugButton'
import './index.less'

export default class PostRequest extends Component {
    state={
        requestPostActive:false
    }

    handleClick=()=>{
        let state=!this.state.requestPostActive
        this.setState({
            requestPostActive:state
        })
    }

    render() {
        return (
            <div className="crawl-first-request-post-item">
                <div className="crawl-first-request-post-url"><span>URL格式:</span>
                <Input className="crawl-first-request-post-url-input"
                    disabled={this.state.requestPostActive}
                    placeholder="url格式,占位符%s"
                />
                </div>
                <div className="crawl-first-request-post-data"><span>data:</span>
                <Input className="crawl-first-request-post-data-input"
                    disabled={this.state.requestPostActive}
                    placeholder="post请求data,占位符%"
                />
                </div>
                <div className="crawl-first-request-post-num"><span>开始参数</span>
                <Input className="crawl-first-request-post-num-input"
                    disabled={this.state.requestPostActive}
                />
                <span>结束参数</span>
                <Input  className="crawl-first-request-post-num-input"
                    disabled={this.state.requestPostActive}
                />
            </div>
            <div className="crawl-first-request-button">
            <DetermineButton className="crawl-first-request-post-button"
                onClick={this.handleClick}
                text={this.state.requestPostActive ? '编辑' :'确定'}
            />
            <DebugButton className="crawl-first-request-post-debug-button"
                text="调试"
            />
            </div>
            </div>
        )
    }
}
