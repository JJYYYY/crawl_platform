import React, { Component } from 'react'
import { Input,message } from 'antd';
import {inject,observer} from 'mobx-react'
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
        getStartNum:'',
        getEndNum:'',
        crawlGetFirstRequestEconding:'utf-8',
        getFormula:'',
        getParams:''
    }

    componentDidMount(){ //加载cookie中的数据
        this.setState((preState)=>({
            getUrl:localStorage.getItem('getUrl') ? localStorage.getItem('getUrl') :preState.getUrl,
            getStartNum:localStorage.getItem('getStartNum') ? localStorage.getItem('getStartNum') :preState.getStartNum,
            getEndNum:localStorage.getItem('getEndNum') ? localStorage.getItem('getEndNum') :preState.getEndNum,
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


    //改变getStartNum
    handlegetStartNum=(e)=>{
        this.setState({
            getStartNum:e.target.value
        })
    }

    //改变getEndNum
    handlegetEndNum=(e)=>{
        this.setState({
            getEndNum:e.target.value
        })
    }

    handleFormula=(e)=>{
        this.setState({
           getFormula:e.target.value
        })
    }

    //将数据写入cookie
    saveData=()=>{
        if (this.state.getUrl && this.state.getStartNum && this.state.getEndNum ){
            localStorage.setItem('getUrl',this.state.getUrl)
            localStorage.setItem('getStartNum',this.state.getStartNum)
            localStorage.setItem('getEndNum',this.state.getEndNum)
            localStorage.setItem('getParams',this.state.getParams)
            localStorage.setItem('getFormula',this.state.getFormula)
            localStorage.setItem('crawlGetFirstRequestEconding',this.state.crawlGetFirstRequestEconding)
            return true
            }
        else{
            message.warning('您还有未添加的项，请补充完整');
             }
    }

   
    handleParams=(e)=>{
        this.setState({
            getParams:e.target.value
        })
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
        if(!localStorage.getItem('name')){
            message.warning('请填写爬虫名字')
        }else{
            localStorage.removeItem("postUrl")
            localStorage.removeItem("postData")
            localStorage.removeItem("startNum")
            localStorage.removeItem("endNum")
            localStorage.removeItem("formula")
            localStorage.removeItem("params")
            localStorage.removeItem("crawlFirstRequestEconding")
        debug('getRequestListUrl',
        {name:localStorage.getItem('name'),
        getUrl:this.state.getUrl,
        getStartNum:this.state.getStartNum,
        crawlGetFirstRequestEconding:this.state.crawlGetFirstRequestEconding,
        getFormula:this.state.getFormula,
        getParams:this.state.getParams}).then(res=>{
           this.props.changeActive()
           this.props.changeText(res.data)
           localStorage.setItem('requestListUrlResponse',res.data)
           localStorage.setItem("baseUrl",res.baseUrl)
        })
    }
    }

    handleChange=(value)=>{
        this.setState({
            crawlGetFirstRequestEconding:value
        })
    }


    render() {
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
                    onChange={this.handlegetStartNum}
                    value={this.state.getStartNum}
                />
                <span>结束</span>
                <Input  className="crawl-first-request-get-num-input"
                    disabled={this.state.requestGetActive}
                    onChange={this.handlegetEndNum}
                    value={this.state.getEndNum}
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
            <DebugButton
                onClick={this.handleDebugClick}
                text="调试"
            /></div>
            </div>
        )
    }
}
