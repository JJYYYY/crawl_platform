import React, { Component } from 'react'
import { Input, message } from 'antd';
import DebugButton from '../debugButton'
import {inject,observer} from 'mobx-react'
import {debug} from '../../api'
import './index.less'

export default @inject(
    stores=>({
        changeActive:stores.debug.changeActive,
        changeText:stores.debug.changeText
    })
)
@observer
class DataAfterProcess extends Component {
    state= {
        dataAfterProcessReplaceData:"",
        dataAfterProcessSplicingData:"",
    }

    componentDidMount(){
        const dataAfterProcessReplaceData=localStorage.getItem("dataAfterProcessReplaceData") ? localStorage.getItem("dataAfterProcessReplaceData") : ""
        const dataAfterProcessSplicingData=localStorage.getItem("dataAfterProcessSplicingData") ? localStorage.getItem("dataAfterProcessSplicingData") : ""
        this.setState({
            dataAfterProcessReplaceData,
            dataAfterProcessSplicingData
        })
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
        localStorage.setItem("dataAfterProcessReplaceData",this.state.dataAfterProcessReplaceData)
    }
    else{
        localStorage.setItem("dataAfterProcessSplicingData",this.state.dataAfterProcessSplicingData)
    }
    const name=localStorage.getItem("name")
    const urls=localStorage.getItem("urls")
    const dataAfterProcessReplaceData=this.state.dataAfterProcessReplaceData
    const dataAfterProcessSplicingData=this.state.dataAfterProcessSplicingData
    debug("dataAfterProcess",{name,type,dataAfterProcessReplaceData,dataAfterProcessSplicingData,urls}).then(
        res=>{
            if(res.statusCode!==200){
                this.props.changeActive()
                this.props.changeText(res.data)
            }else{
                this.props.changeActive()
                this.props.changeText(res.data)
                localStorage.setItem('urls',res.data)
            }
        }
        )
    }





    render() {
        let temp='替换规则，用￥分隔，如<a href>￥<a>，表示将返回结果中所有的<a href>替换为<a>,可写多个，多个规则用;分隔，替换顺序与输入一'
        return (
            <div className="first-request-data-after-process">
                <div className="first-request-data-after-process-wrapper">
            <span>url处理</span></div>
        <div className='input-explain'>{temp}</div>
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
