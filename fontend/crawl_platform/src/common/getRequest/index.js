import React, { Component } from 'react'
import { Input, Button } from 'antd';
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
            <div className='crawl-first-request-get-item'>
                <div className='crawl-first-request-get-url'><span>URL格式:</span>
                <Input placeholder="url格式,占位符%s" className='crawl-first-request-get-url-input' disabled={this.state.requestGetActive}/>
                </div>
                <div className='crawl-first-request-get-num'><span>开始参数</span>
                <Input className='crawl-first-request-get-num-input' disabled={this.state.requestGetActive}/>
                <span>结束参数</span>
                <Input  className='crawl-first-request-get-num-input'disabled={this.state.requestGetActive}/>
            </div>
        <Button className='crawl-first-request-get-button' size='middle' type='primary' onClick={this.handleClick}>
            {this.state.requestGetActive ? "编辑" :"确定"}
            </Button>
            <Button className='crawl-first-request-get-debug-button' size='middle' type='primary' >
                调试
            </Button>
            </div>
        )
    }
}
