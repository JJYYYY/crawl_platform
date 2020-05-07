import React, { Component } from 'react'
import { Input,Switch, message } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {inject,observer} from 'mobx-react'
import WrapperSelect from  '../wrapperSelect'
import {debug} from '../../api'
import DebugButton from '../debugButton'
import './index.less'

export default @inject(
    stores=>({
        changeActive:stores.debug.changeActive,
        changeText:stores.debug.changeText
    })
)
@observer

class UrlExtraction extends Component {
    state={
        urlExtractionType:'css',
        urlExtractionJsonChecked:false,
        urlExtractionRule:"",
    }
    handleChange=(val)=>{
        this.setState({
            urlExtractionType:val,
            urlExtractionRule:''
        })
    }
    onChange=(checked) =>{
        this.setState({
            urlExtractionJsonChecked:checked,
        },()=>{localStorage.setItem("urlExtractionJsonChecked",this.state.urlExtractionJsonChecked)})
    }

    getText=()=>{
        let result=''
        switch(this.state.urlExtractionType){
            case 'css':
                result='css选择器，用;分隔，前面为选出含有所有url的选择器，后面为提取url的选择器'
                break
            case 're':
                result='正则表达式，用于提取所有符合条件url'
                break;
            case 'json':
                result='提取json的层级,如datalist;url,表示提取数据中datalist中每一项的url字段'
                break
            default:
                break
        }
        return result
    }

    handleInputChange=(e)=>{
        let urlExtractionRule=e.target.value
        this.setState({
            urlExtractionRule
        })
    }

    handleClick=()=>{
        localStorage.setItem("urlExtractionType",this.state.urlExtractionType)
       {
            localStorage.setItem("urlExtractionRule",this.state.urlExtractionRule)
            const name=localStorage.getItem("name")
            const requestListUrlResponse=localStorage.getItem("requestListUrlResponse")
            const urlExtractionType=this.state.urlExtractionType
            const urlExtractionRule=localStorage.getItem("urlExtractionRule")
            const baseUrl=localStorage.getItem("baseUrl")
            if (!urlExtractionRule){
                message.warning("请填写提取规则")
            }
            debug("urlExtraction",{name,requestListUrlResponse,urlExtractionType,urlExtractionRule,baseUrl}).then(
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
    }

    componentDidMount(){
        const urlExtractionType=localStorage.getItem("urlExtractionType") ? localStorage.getItem("urlExtractionType"):"css"
        const urlExtractionJsonChecked=localStorage.getItem("urlExtractionJsonChecked") ? localStorage.getItem("urlExtractionJsonChecked") : false
        const urlExtractionRule=localStorage.getItem('urlExtractionRule') ? localStorage.getItem("urlExtractionRule") : ""
        this.setState({
              urlExtractionType,
            urlExtractionJsonChecked,
            urlExtractionRule
        })
    }

    render() {
        const data=[{value:'css',text:'CSS'},{value:'re',text:'正则'},{value:'json',text:'Json'}]
        return (
            <div className="first-request-url-extraction">
                <div className="first-request-url-extraction-wrapper">
                <span className="first-request-url-extraction-title">url提取</span>
                <WrapperSelect
                    data={data}
                    value={this.state.urlExtractionType}
                    onChange={this.handleChange}
                    width="123"
                />
                </div>
                <div className='input-explain'>{this.getText()}</div>
                {this.state.urlExtractionType!=='json' ?
                <div className="first-request-url-extraction-input"><Input onChange={this.handleInputChange}  value={this.state.urlExtractionRule}/>
                <DebugButton  onClick={this.handleClick} text="调试"/></div>
                :
                <div className="first-request-url-extraction">
                <Switch
                    checkedChildren={<CheckOutlined />}
                    defaultChecked={false}
                    onChange={this.onChange}
                    unCheckedChildren={<CloseOutlined />}
                ></Switch>
                <span>是否直接提取数据</span>{this.state.urlExtractionJsonChecked ? '' :
                 <div className="first-request-url-extraction-input">
                     <Input onChange={this.handleInputChange} value={this.state.urlExtractionRule}/>
                     <DebugButton onClick={this.handleClick}  text="调试"/>
                     </div>}
                     </div>}
            </div>
        )
    }
}
