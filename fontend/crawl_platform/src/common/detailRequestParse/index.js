import React, { Component } from 'react'
import { Input, message} from 'antd';
import WrapperSelect from '../wrapperSelect'
import cookie from 'react-cookies'
import DebugButton from '../debugButton'
import DetermineButton from '../determineButton'
import {getTable} from '../../api'
import './index.less'

export default class DetailRequestParse extends Component {

    state={
        names:[],
        tables:[],
        selectVal:'',
        fieldExtractData:{}
    }



    componentDidMount(){
        getTable().then(
            res=>{
                this.setState({
                    tables:res.data,
                    selectVal: cookie.load('tableName') ? cookie.load('tableName')  :  res.data.length>0 ? res.data[0].value : ''
                },()=>{
                    if (this.state.tables.length>0){
                        cookie.save('tableName',this.state.tables[0].value)
                    getTable(this.state.tables[0].value).then(
                        res=>{
                            let names=this.getNames(JSON.parse(res.data))
                            this.setState({
                             names
                            })
                        }
                    )}
                }
                )
    }
    )
}

handleInputChange=(e,index)=>{
    let field=this.state.names[index]
    let data=this.state.fieldExtractData
   data[field]=e.target.value
    this.setState({
        fieldExtractData:data
    })
}


getNames=(data)=>{
    let result=[]
    data.map(item=>{
    return   result.push(item.name)
 })
 return result
}

    handleChange=(value)=>{
        cookie.save('tableName',value)
        this.setState({
            selectVal:value
        },()=>{getTable(this.state.selectVal).then(res=>{
            let names=this.getNames(JSON.parse(res.data))
            this.setState({
             names
            })
        })
    }
        )
    }



    handleClick=(index)=>{
        let inputVal=this.state.fieldExtractData[this.state.names[index]]
        if (!inputVal){
            message.warning('请填写规则再调试')
        }
        else{
            cookie.save(this.state.names[index],inputVal)
        }
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
    <Input  defaultValue={cookie.load(this.state.names[index]) ? cookie.load(this.state.names[index]) : ''}
        onChange={(e)=>{this.handleInputChange(e,index)}}
    /><DebugButton onClick={()=>{this.handleClick(index)}}
        text="调试"
      /></span>
        </div>
    }
    render() {
        console.log('this.state.fieldExtractData',this.state.fieldExtractData)
        return (
            <div className="detail-request-parse">
                <div className="detail-request-parse-wrapper">
                    <span className="detail-request-parse-tb-name">表名</span>
                <WrapperSelect  data={this.state.tables}
                    onChange={(value)=>this.handleChange(value)}
                    // defaultValue={this.state.tables.length>0 ? this.state.tables[0].value : ""}
                    value={this.state.selectVal}
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
