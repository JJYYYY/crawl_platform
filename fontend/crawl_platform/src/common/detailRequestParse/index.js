import React, { Component } from 'react'
import { Input} from 'antd';
import WrapperSelect from '../wrapperSelect'
import DebugButton from '../debugButton'
import DetermineButton from '../determineButton'
import './index.less'

export default class DetailRequestParse extends Component {
    state={
        names:['标题','内容','发布时间','类别']
    }

    handleChange=(value)=>{
        console.log(`selected ${value}`);
    }

    renderTags=(item,index)=>{
        return <div className="field-name"
            key={index}
               >
            <span className="name">{item}</span>
        <span className="selector">
            <WrapperSelect  data={[
                        {value:'css',
                            text:'Css'
                        },
                        {
                            value:'re',
                            text:'正则'
                        }
                    ]}
                defaultValue="css"
                onChange={(value)=>this.handleChange(value)}
                width="0.7rem"
            />
    <Input/><DebugButton text="调试"/></span>
        </div>
    }
    render() {
        return (
            <div className="detail-request-parse">
                <div className="detail-request-parse-wrapper">
                    <span className="detail-request-parse-tb-name">表名</span>
                <WrapperSelect  data={[
                        {value:'jack',
                            text:'Jack'
                        },
                        {
                            value:'lucy',
                            text:'Lucy'
                        }
                    ]}
                    defaultValue="lucy"
                    onChange={(value)=>this.handleChange(value)}
                    width="100"
                /></div>
    {this.state.names?<div className="title">
        <span>字段名</span><span>提取方式</span></div>:''}
    {this.state.names.map((item,index)=>{
        return this.renderTags(item,index)
    })}
    {this.state.names? <div className="submit"><DetermineButton text="确定"/></div>:''}
            </div>
        )
    }
}
