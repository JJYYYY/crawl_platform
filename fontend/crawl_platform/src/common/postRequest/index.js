import React, { Component } from 'react'
import { Input,message} from 'antd';
import {inject,observer} from 'mobx-react'
import DetermineButton from '../determineButton'
import WrapperSelect from '../wrapperSelect'
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


class PostRequest extends Component {
    state={
        requestPostActive:false,
        postUrl:'',
        postData:'',
        startNum:'',
        endNum:'',
        crawlFirstRequestEconding:'',
        params:'',
        formula:''
    }

    componentDidMount(){ //加载cookie中的数据
        this.setState((preState)=>({
            postUrl:localStorage.getItem('postUrl') ? localStorage.getItem('postUrl') :preState.postUrl,
            params:localStorage.getItem('params') ? localStorage.getItem('params') :preState.params,
            postData:localStorage.getItem('postData') ? localStorage.getItem('postData') :preState.postData,
            startNum:localStorage.getItem('startNum') ? localStorage.getItem('startNum') :preState.startNum,
            endNum:localStorage.getItem('endNum') ? localStorage.getItem('endNum') :preState.endNum,
            formula:localStorage.getItem('formula') ? localStorage.getItem('formula') :preState.formula,
            crawlFirstRequestEconding:localStorage.getItem('crawlFirstRequestEconding') ? localStorage.getItem('crawlFirstRequestEconding') : 'utf-8'
        }))
     }

       //改变postUrl
       handlePostUrl=(e)=>{
        this.setState({
            postUrl:e.target.value
        })
    }

     //改变postData
     handlepostData=(e)=>{
        this.setState({
            postData:e.target.value
        })
    }

    handleParams=(e)=>{
        this.setState({
            params:e.target.value
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
    handleFormula=(e)=>{
        this.setState({
            formula:e.target.value
        })
    }


    //将数据写入cookie
    savepostData=()=>{
        if (this.state.postUrl && this.state.startNum && this.state.endNum && this.state.postData){
            localStorage.setItem('postUrl',this.state.postUrl)
            localStorage.setItem('postData',this.state.postData)
            localStorage.setItem('startNum',this.state.startNum)
            localStorage.setItem('endNum',this.state.endNum)
            localStorage.setItem('formula',this.state.formula)
            localStorage.setItem('params',this.state.params)
            localStorage.setItem('crawlFirstRequestEconding',this.state.crawlFirstRequestEconding)
            return true
            }
        else{
            message.warning('您还有未添加的项，请补充完整');
             }
    }

    handleClick=()=>{//点击确定按钮
        let result=this.savepostData()
        if (result){
        let state=!this.state.requestPostActive
        this.setState({
            requestPostActive:state
        },()=>{
            this.props.changeRadioState()
        })}
    }


    handleDebugClick=()=>{ //点击调试按钮
        console.log('post')
        let result=this.savepostData()
        if (result){
        if(!this.state.requestPostActive){
            this.props.changeRadioState();
            this.setState({
                requestPostActive:!this.state.requestPostActive
            })
        }}
        if(!localStorage.getItem('name')){
            message.warning('请填写爬虫名字')
        }else{
        debug('postRequestListUrl',
        {name:localStorage.getItem('name'),postUrl:this.state.postUrl,postData:this.state.postData,crawlFirstRequestEconding:this.state.crawlFirstRequestEconding,startNum:this.state.startNum,params:this.state.params,formula:this.state.formula}).then(res=>{
            this.props.changeActive()
            this.props.changeText(res.data)
            localStorage.setItem('postRequestListUrlResponse',res.data)
        })
    }
    }





    handleChange=(value)=>{
        this.setState({
            crawlFirstRequestEconding:value
        })
    }
    render() {
        return (
            <div className="crawl-first-request-post-item">
                <div className="crawl-first-request-post-url"><span>URL格式:</span>
                <Input className="crawl-first-request-post-url-input"
                    disabled={this.state.requestPostActive}
                    onChange={this.handlePostUrl}
                    placeholder="url格式,占位符%s"
                    value={this.state.postUrl}
                />
                </div>
                <div className="crawl-first-request-post-data"><span>params:</span>
                <Input className="crawl-first-request-post-data-input"
                    disabled={this.state.requestPostActive}
                    onChange={this.handleParams}
                    placeholder="params参数"
                    value={this.state.params}
                />
                </div>
                <div className="crawl-first-request-post-data"><span>data:</span>
                <Input className="crawl-first-request-post-data-input"
                    disabled={this.state.requestPostActive}
                    onChange={this.handlepostData}
                    placeholder="post请求data,占位符%"
                    value={this.state.postData}
                />
                </div>
                <div className="crawl-first-request-post-num"><span>开始</span>
                <Input className="crawl-first-request-post-num-input"
                    disabled={this.state.requestPostActive}
                    onChange={this.handleStartNum}
                    value={this.state.startNum}
                />
                <span>结束</span>
                <Input  className="crawl-first-request-post-num-input"
                    disabled={this.state.requestPostActive}
                    onChange={this.handleEndNum}
                    value={this.state.endNum}
                />
                <span>公式</span>
                <Input  className="crawl-first-request-post-num-input"
                    disabled={this.state.requestPostActive}
                    onChange={this.handleFormula}
                    value={this.state.formula}
                />

            </div>
            <div className="crawl-first-request-button">
            <div className="url-encoding">
            <span>网页编码方式</span>
            <WrapperSelect
                data={[
                        {value:'utf-8',
                            text:'utf-8'
                        },
                        {
                            value:'gbk',
                            text:'gbk'
                        },{
                            value:'gb2312',
                            text:'gb2312'
                        }
                    ]}
                disabled={this.state.requestPostActive}
                onChange={this.handleChange}
                value={this.state.crawlFirstRequestEconding}
                width="80"
            /></div>
            <DetermineButton className="crawl-first-request-post-button"
                onClick={this.handleClick}
                text={this.state.requestPostActive ? '编辑' :'确定'}
            />
            <DebugButton className="crawl-first-request-post-debug-button"
                onClick={this.handleDebugClick}
                text="调试"
            />
            </div>
            </div>
        )
    }
}
