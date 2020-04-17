import React, { Component } from 'react'
import { Input, Button } from 'antd';
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
            <div className='crawl-first-request-post-item'>
                <div className='crawl-first-request-post-url'><span>URL格式:</span>
                <Input placeholder="url格式,占位符%s" className='crawl-first-request-post-url-input' disabled={this.state.requestPostActive}/>
                </div>
                <div className='crawl-first-request-post-data'><span>data:</span>
                <Input placeholder="post请求data,占位符%" className='crawl-first-request-post-data-input' disabled={this.state.requestPostActive}/>
                </div>
                <div className='crawl-first-request-post-num'><span>开始参数</span>
                <Input className='crawl-first-request-post-num-input' disabled={this.state.requestPostActive}/>
                <span>结束参数</span>
                <Input  className='crawl-first-request-post-num-input'disabled={this.state.requestPostActive}/>
            </div>
        <Button className='crawl-first-request-post-button' size='middle' type='primary' onClick={this.handleClick}>
            {this.state.requestPostActive ? "编辑" :"确定"}
            </Button>
            <Button className='crawl-first-request-post-debug-button' size='middle' type='primary'>
            调试
            </Button>
            </div>
        )
    }
}
