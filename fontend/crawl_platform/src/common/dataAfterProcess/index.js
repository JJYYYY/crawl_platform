import React, { Component } from 'react'
import { Input, message } from 'antd';
import cookie from 'react-cookies'
import DebugButton from '../debugButton'
import './index.less'

export default class DataAfterProcess extends Component {
    state= {
        dataAfterProcessReplaceData:"",
        dataAfterProcessSplicingData:"",
    }
  

    handleReplaceChange=(e)=>{
        this.setState({
            dataAfterProcessReplaceData:e.target.value 
        })
    }

    handleSplicingChange=(e)=>{
        this.setState({
            dataAfterProcessSplicingData:e.target.value 
        })
    }

    handleClick=(type)=>{
    if((type==='replace' && !this.state.dataAfterProcessReplaceData) || (type==='splicing' && !this.state.dataAfterProcessSplicingData)) {
        message.warning("内容不能为空")
        return 
    }
    if (type==='replace'){
        cookie.save("state.dataAfterProcessReplaceDat",this.state.dataAfterProcessReplaceData)
    }
    else{
        cookie.save("dataAfterProcessSplicingData",this.state.dataAfterProcessSplicingData)
    }
    }


    render() {
        return (
            <div className="first-request-data-after-process">
                <div className="first-request-data-after-process-wrapper">
            <span>url处理</span></div>
            <div className='input-explain'>用$$分隔，如../$$/，表示将返回结果中所有的../替换为/,可写多个，多个规则用@@分隔，替换顺序与输入一致</div>
            <div className="first-request-data-after-process-url-process">
              <div className="first-request-data-after-process-url-process-replace">
                  <span>替换</span><Input  onChange={this.handleReplaceChange}/><DebugButton onClick={()=>{this.handleClick("replace")}}  text="调试"/>
                </div>
                <div className='input-explain'>格式如下'https://www.bilibili.com/video/%s?p=61%params',params为上次返回的结果</div>
                <div className="first-request-data-after-process-url-process-splicing">
                <span>拼接</span><Input onChange={this.handleSplicingChange} /><DebugButton onClick={()=>{this.handleClick("splicing")}}  text="调试"/>
                </div>
                </div>
            </div>
        )
    }
}
