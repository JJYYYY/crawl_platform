import React, { Component } from 'react'
import { Input,Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import WrapperSelect from  '../wrapperSelect'
import DebugButton from '../debugButton'
import './index.less'

export default class UrlExtraction extends Component {
    state={
        selectVal:'css',
        checked:false
    }
    handleChange=(val)=>{
        this.setState({
            selectVal:val
        })
    }
    onChange=(checked) =>{
        this.setState({
            checked:checked
        })
    }

    getText=()=>{
        let result=''
        switch(this.state.selectVal){
            case 'css':
                result='css选择器，用$$分隔，前面为选出含有所有url的选择器，后面为提取url的选择器'
                break
            case 're':
                result='正则表达式，用于提取所有符合条件url'
                break;
            case 'json':
                result='提取json的层级,如.data.datalist,[.url],表示提取data下的datalist中每一项的url字段'
                break
            default:
                break
        }
        return result
    }
    render() {
        const data=[{value:'css',text:'CSS'},{value:'re',text:'正则'},{value:'json',text:'Json'}]
        return (
            <div className="first-request-url-extraction">
                <div className="first-request-url-extraction-wrapper">
                <span className="first-request-url-extraction-title">url提取</span>
                <WrapperSelect
                    data={data}
                    defaultValue={data[0].value}
                    onChange={this.handleChange}
                    width="123"
                />
                </div>
                {this.state.selectVal!=='json' ?
                <div className="first-request-url-extraction-input"><Input placeholder={this.getText()}/><DebugButton text="调试"/></div>
                :
                <div className="first-request-url-extraction">
                <Switch
                    checkedChildren={<CheckOutlined />}
                    defaultChecked={false}
                    onChange={this.onChange}
                    unCheckedChildren={<CloseOutlined />}
                ></Switch>
                <span>是否直接提取数据</span>{this.state.checked ? '' :
                 <div className="first-request-url-extraction-input">
                     <Input  placeholder={this.getText()} />
                     <DebugButton text="调试"/>
                     </div>}
                     </div>}
            </div>
        )
    }
}
