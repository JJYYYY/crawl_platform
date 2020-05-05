import React, { Component } from 'react'
import { Input,message } from 'antd';
import {inject,observer} from 'mobx-react'
import DetermineButton from '../determineButton'
import WrapperSelect from '../wrapperSelect'
import { debug } from '../../api'
import DebugButton from '../debugButton'
import './index.less'



export default @inject(
    stores=>({
        changeActive:stores.debug.changeActive,
        changeText:stores.debug.changeText
    })
)
@observer
 class GetRequest extends Component {
    state={
        requestGetActive:false,
        getUrl:'',
        startNum:'',
        endNum:'',
        crawlGetFirstRequestEconding:'utf-8',
        getFormula:'',
        getParams:''
    }

    componentDidMount(){ //加载cookie中的数据
        this.setState((preState)=>({
            getUrl:localStorage.getItem('getUrl') ? localStorage.getItem('getUrl') :preState.getUrl,
            startNum:localStorage.getItem('startNum') ? localStorage.getItem('startNum') :preState.startNum,
            endNum:localStorage.getItem('endNum') ? localStorage.getItem('endNum') :preState.endNum,
            getFormula:localStorage.getItem('getFormula') ? localStorage.getItem('getFormula') :preState.getFormula,
            getParams:localStorage.getItem('getParams') ? localStorage.getItem('getParams') :preState.getParams,
            crawlGetFirstRequestEconding:localStorage.getItem('crawlGetFirstRequestEconding') ? localStorage.getItem('crawlGetFirstRequestEconding') :preState.crawlGetFirstRequestEconding
        }))
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

    handleFormula=(e)=>{
        this.setState({
           getFormula:e.target.value
        })
    }

    //将数据写入cookie
    saveData=()=>{
        console.log('saveData')
        if (this.state.getUrl && this.state.startNum && this.state.endNum ){
            localStorage.setItem('getUrl',this.state.getUrl)
            localStorage.setItem('startNum',this.state.startNum)
            localStorage.setItem('endNum',this.state.endNum)
            localStorage.setItem('getParams',this.state.getParams)
            localStorage.setItem('getFormula',this.state.getFormula)
            localStorage.setItem('crawlGetFirstRequestEconding',this.state.crawlGetFirstRequestEconding)
            return true
            }
        else{
            message.warning('您还有未添加的项，请补充完整');
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
    handleParams=(e)=>{
        this.setState({
            getParams:e.target.value
        })
    }

    handleDebugClick=()=>{ //点击调试按钮
        console.log('get')
        let result=this.saveData()
        if (result){
        if(!this.state.requestGetActive){
            this.props.changeRadioState();
            this.setState({
                requestGetActive:!this.state.requestGetActive
            })
        }}
        if(!localStorage.getItem('name')){
            message.warning('请填写爬虫名字')
        }else{
        debug('getRequestListUrl',
        {name:localStorage.getItem('name'),getUrl:this.state.getUrl,startNum:this.state.startNum,crawlGetFirstRequestEconding:this.state.crawlGetFirstRequestEconding,formula:this.state.getFormula,params:this.state.getParams}).then(res=>{
           this.props.changeActive()
           this.props.changeText(res.data)
           localStorage.setItem('getRequestListUrlResponse',res.data)
        })
    }
    }

    handleChange=(value)=>{
        this.setState({
            crawlGetFirstRequestEconding:value
        })
    }


    render() {
        console.log('code',this.state.crawlGetFirstRequestEconding)
        return (
            <div className="crawl-first-request-get-item">
                <div className="crawl-first-request-get-url"><span>URL格式:</span>
                <Input className="crawl-first-request-get-url-input"
                    disabled={this.state.requestGetActive}
                    onChange={this.handleGetUrl}
                    placeholder="url格式,占位符%s"
                    value={this.state.getUrl}
                />
                </div>
                <div className="crawl-first-request-params"><span>params:</span>
                <Input className="crawl-first-request-params-input"
                    disabled={this.state.requestGetActive}
                    onChange={this.handleParams}
                    placeholder="params参数"
                    value={this.state.getParams}
                />
                </div>
                <div className="crawl-first-request-get-num"><span>开始</span>
                <Input className="crawl-first-request-get-num-input"
                    disabled={this.state.requestGetActive}
                    onChange={this.handleStartNum}
                    value={this.state.startNum}
                />
                <span>结束</span>
                <Input  className="crawl-first-request-get-num-input"
                    disabled={this.state.requestGetActive}
                    onChange={this.handleEndNum}
                    value={this.state.endNum}
                />
                 <span>公式</span>
                <Input  className="crawl-first-request-get-num-input"
                    disabled={this.state.requestGetActive}
                    onChange={this.handleFormula}
                    value={this.state.getFormula}
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
                disabled={this.state.requestGetActive}
                onChange={this.handleChange}
                value={this.state.crawlGetFirstRequestEconding}
                width="80"
            /></div>
            <DetermineButton
                onClick={this.handleClick}
                text={this.state.requestPostActive ? '编辑' :'确定'}
            />
            <DebugButton
                onClick={this.handleDebugClick}
                text="调试"
            /></div>
            </div>
        )
    }
}
