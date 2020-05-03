import React, { Component } from 'react';
import { Input } from 'antd';
import cookie from 'react-cookies'
import DebugButton from '../debugButton'
import './index.less'

export default class DataPreProcess extends Component {
    state={
        dataProcessReplaceData:""
    }


    componentDidMount(){
        let dataProcessReplaceData=cookie.load("dataProcessReplaceData") ? cookie.load("dataProcessReplaceData") : ""
        this.setState({
            dataProcessReplaceData
        })
    }

    handleChange=(e)=>{
        this.setState({
            dataProcessReplaceData:e.target.value
        })
    }


    handleClick=()=>{
        cookie.save("dataProcessReplaceData",this.state.dataProcessReplaceData)
    }

    render() {
        const replace="替换规则，用$$分隔，如<a href>$$<a>，表示将返回结果中所有的<a href>替换为<a>,可写多个，多个规则用@@分隔，替换顺序与输入一致"
        return (
            <div className="first-request-data-pre-process">
        <div className="first-request-data-pre-proces-switch">
            <span>数据预处理</span></div>
            <div className='input-explain'>{replace}</div>
            <div className="first-request-data-pre-proces-replace"> <span>替换</span>
            <Input  
            onChange={this.handleChange}
            /> <DebugButton text="调试" onClick={this.handleClick}/>
            </div>
            </div>
        )
    }
}
