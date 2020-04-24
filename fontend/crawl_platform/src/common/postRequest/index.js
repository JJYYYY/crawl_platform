import React, { Component } from 'react'
import { Input,message} from 'antd';
import cookie from 'react-cookies'
import DetermineButton from '../determineButton'
import DebugButton from '../debugButton'
import './index.less'

export default class PostRequest extends Component {
    state={
        requestPostActive:false,
        postUrl:"",
        postData:"",
        startNum:"",
        endNum:""
    }

       //改变getUrl
       handlePostUrl=(e)=>{
        this.setState({
            getUrl:e.target.value
        })
    }

     //改变postData
     handlepostData=(e)=>{
        this.setState({
            postData:e.target.value
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
    savepostData=()=>{
        if (this.state.getUrl && this.state.startNum && this.state.endNum && this.state.postData){
            cookie.save("getUrl",this.state.getUrl)
            cookie.save("postData",this.state.postData)
            cookie.save("startNum",this.state.startNum)
            cookie.save("endNum",this.state.endNum)
            return true
            }
        else{
            message.warning("您还有未添加的项，请补充完整");
             }   
    }

    handleClick=()=>{//点击确定按钮
        let result=this.savepostData()
        if (result){
        let state=!this.state.requestGetActive
        this.setState({
            requestGetActive:state
        },()=>{
            this.props.changeRadioState()
        })}
    }


    handleDebugClick=()=>{ //点击调试按钮
        let result=this.savepostData()
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
           postData:cookie.load("postData") ? cookie.load("postData") :preState.postData,
           startNum:cookie.load("startNum") ? cookie.load("startNum") :preState.startNum,
           endNum:cookie.load("endNum") ? cookie.load("endNum") :preState.endNum
       }))
    }


    render() {
        return (
            <div className="crawl-first-request-post-item">
                <div className="crawl-first-request-post-url"><span>URL格式:</span>
                <Input className="crawl-first-request-post-url-input"
                    value={this.state.postUrl}
                    onChange={this.handlePostUrl}
                    disabled={this.state.requestPostActive}
                    placeholder="url格式,占位符%s"
                />
                </div>
                <div className="crawl-first-request-post-data"><span>data:</span>
                <Input className="crawl-first-request-post-data-input"
                    value={this.state.postData}
                    onChange={this.handlepostData}
                    disabled={this.state.requestPostActive}
                    placeholder="post请求data,占位符%"
                />
                </div>
                <div className="crawl-first-request-post-num"><span>开始页码</span>
                <Input className="crawl-first-request-post-num-input"
                    value={this.state.startNum}
                    onChange={this.handleStartNum}
                    disabled={this.state.requestPostActive}
                />
                <span>结束页码</span>
                <Input  className="crawl-first-request-post-num-input"
                    value={this.state.endNum}
                    onChange={this.handleEndNum}
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
                 onClick={this.handleDebugClick}
            />
            </div>
            </div>
        )
    }
}
