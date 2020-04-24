import React, { Component } from 'react'
import { Input,message } from 'antd';
import DetermineButton from '../determineButton'
import cookie from 'react-cookies'
import DebugButton from '../debugButton'
import './index.less'

export default class GetRequest extends Component {
    state={
        requestGetActive:false,
        getUrl:"",
        startNum:"",
        endNum:""
    }


    //改变getUrl
    handleGetUrl=(e)=>{
        this.setState({
            getUrl:e.target.value
        })
    }


    //改变startNum
    handleStartNum=(e)=>{
        this.setState({
            startNum:e.target.value
        })
    }

    //改变endNum
    handleEndNum=(e)=>{
        this.setState({
            endNum:e.target.value
        })
    }


    //将数据写入cookie
    saveData=()=>{
        if (this.state.getUrl && this.state.startNum && this.state.endNum ){
            cookie.save("getUrl",this.state.getUrl)
            cookie.save("startNum",this.state.startNum)
            cookie.save("endNum",this.state.endNum)
            return true
            }
        else{
            message.warning("您还有未添加的项，请补充完整");
             }   
    }

    handleClick=()=>{//点击确定按钮
        let result=this.saveData()
        if (result){
        let state=!this.state.requestGetActive
        this.setState({
            requestGetActive:state
        },()=>{
            this.props.changeRadioState()
        })}
    }


    handleDebugClick=()=>{ //点击调试按钮
        let result=this.saveData()
        if (result){
        if(!this.state.requestGetActive){
            this.props.changeRadioState();
            this.setState({
                requestGetActive:!this.state.requestGetActive
            })
        }}
    }



    componentDidMount(){ //加载cookie中的数据
       this.setState((preState,props)=>({
           getUrl:cookie.load("getUrl") ? cookie.load("getUrl") :preState.getUrl,
           startNum:cookie.load("startNum") ? cookie.load("startNum") :preState.startNum,
           endNum:cookie.load("endNum") ? cookie.load("endNum") :preState.endNum
       }))
    }

    render() {
        return (
            <div className="crawl-first-request-get-item">
                <div className="crawl-first-request-get-url"><span>URL格式:</span>
                <Input className="crawl-first-request-get-url-input"
                    disabled={this.state.requestGetActive}
                    value={this.state.getUrl}
                    onChange={this.handleGetUrl}
                    placeholder="url格式,占位符%s"
                />
                </div>
                <div className="crawl-first-request-get-num"><span>开始页码</span>
                <Input className="crawl-first-request-get-num-input"
                    onChange={this.handleStartNum}
                    value={this.state.startNum}
                    disabled={this.state.requestGetActive}
                />
                <span>结束页码</span>
                <Input  className="crawl-first-request-get-num-input"
                    onChange={this.handleEndNum}
                    value={this.state.endNum}
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
                onClick={this.handleDebugClick}
            /></div>
            </div>
        )
    }
}
