import React, { Component } from 'react';
import { Input, message } from 'antd';
import {inject,observer} from 'mobx-react'
import DebugButton from '../debugButton'
import {debug} from '../../api'
import './index.less'

export default @inject(
    stores=>({
        changeActive:stores.debug.changeActive,
        changeText:stores.debug.changeText
    })
)
@observer

class DataPreProcess extends Component {
    state={
        dataProcessReplaceData:''
    }


    componentDidMount(){
        let dataProcessReplaceData=localStorage.getItem('dataProcessReplaceData') ? localStorage.getItem('dataProcessReplaceData') : ''
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
        localStorage.setItem('dataProcessReplaceData',this.state.dataProcessReplaceData)
        const dataProcessReplaceData=this.state.dataProcessReplaceData
        const requestListUrlResponse=localStorage.getItem("requestListUrlResponse")
        const name=localStorage.getItem("name")
        if (!dataProcessReplaceData){
            message.warning("请填写规则")
        }
        else if(!requestListUrlResponse)
        {
            message.warning("您还没有获取网页数据")
        }
        else{
            debug("dataProcessReplace",{dataProcessReplaceData,requestListUrlResponse,name}).then(
                res=>{
                    if (res.statusCode!==200){
                        this.props.changeActive()
                    this.props.changeText(res.data)
                    }
                    else{
                        this.props.changeActive()
                        this.props.changeText(res.data)
                    localStorage.setItem('requestListUrlResponse',res.data)
                }
                }
            )
        }

    }

    render() {
        const replace='替换规则，用￥分隔，如<a href>￥<a>，表示将返回结果中所有的<a href>替换为<a>,可写多个，多个规则用;分隔，替换顺序与输入一致'
        return (
            <div className="first-request-data-pre-process">
        <div className="first-request-data-pre-proces-switch">
            <span>数据预处理</span></div>
            <div className="input-explain">{replace}</div>
            <div className="first-request-data-pre-proces-replace"> <span>替换</span>
            <Input
                value={this.state.dataProcessReplaceData}
                onChange={this.handleChange}
            /> <DebugButton onClick={this.handleClick}
                text="调试"
               />
            </div>
            </div>
        )
    }
}
