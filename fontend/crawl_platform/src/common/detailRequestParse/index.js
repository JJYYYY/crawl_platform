import React, { Component } from 'react'
import { Input, message} from 'antd';
import WrapperSelect from '../wrapperSelect'
import DebugButton from '../debugButton'
import {inject,observer} from 'mobx-react'
import DetermineButton from '../determineButton'
import {getTable,debug} from '../../api'
import './index.less'

export default @inject(
    stores=>({
        changeActive:stores.debug.changeActive,
        changeText:stores.debug.changeText
    })
)
@observer
class DetailRequestParse extends Component {

    state={
        names:[],
        tables:[],
        selectVal:'',
        fieldSelectVal:{},
        fieldExtractData:{}
    }



    componentDidMount(){
        getTable().then(
            res=>{
                this.setState({
                    tables:res.data,
                    selectVal: localStorage.getItem('tableName') ? localStorage.getItem('tableName')  :  res.data.length>0 ? res.data[0].value : ''
                },()=>{
                    if (this.state.tables.length>0){
                        localStorage.setItem('tableName',this.state.tables[0].value)
                    getTable(this.state.tables[0].value).then(
                        res=>{
                            let names=this.getNames(JSON.parse(res.data))
                            this.setState({
                             names
                            },()=>{
                                let fieldSelectVal=this.state.fieldSelectVal
                                this.state.names.map(
                                    item=>
                                    fieldSelectVal[item]='CSS'
                                )
                                this.setState({
                                    fieldSelectVal
                                })
                            }
                            )
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
        localStorage.setItem('tableName',value)
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

    handleSelectChange=(index,value)=>{
        const fieldSelectVal=this.state.fieldSelectVal
        fieldSelectVal[this.state.names[index]]=value
        this.setState({
            fieldSelectVal
        })
        localStorage.setItem("fieldSelectVal",fieldSelectVal)
    }


    handleClick=(index)=>{
        let inputVal=this.state.fieldExtractData[this.state.names[index]]
        if (!inputVal){
            message.warning('请填写规则再调试')
            
        }
        else{
            const name=localStorage.getItem("name")
            const detailPageHtml=localStorage.getItem("detailPageHtml")
            if (!detailPageHtml){
                message.warning("您还未获取详情页数据")
                return 
            }
            const key=this.state.names[index]
            const fieldExtractData=this.state.fieldExtractData[key]
            const fieldSelectVal=this.state.fieldSelectVal[key]
            const value={}
            value[key]={fieldExtractData,fieldSelectVal}
            localStorage.setItem(`${key}_last`,JSON.stringify(value))
            debug("detailRequestParse",{fieldExtractData,fieldSelectVal,name,detailPageHtml}).then(
                res=>{
                    this.props.changeActive()
                this.props.changeText(res.data)
                }
            )
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
                value={this.state.fieldSelectVal[item]}
                onChange={(value)=>this.handleSelectChange(index,value)}
                width="0.7rem"
            />
    <Input  
        onChange={(e)=>{this.handleInputChange(e,index)}}
    /><DebugButton onClick={()=>{this.handleClick(index)}}
        text="调试"
      /></span>
        </div>
    }


    handleSubmitClick=()=>{
        const items=localStorage
        const name=localStorage.getItem("name")
        localStorage.removeItem("urls")
        localStorage.removeItem("requestListUrlResponse")
        localStorage.removeItem("detailPageHtml")
        debug("save",{name,items}).then(
        res=>
            {
            if (res.statusCode===200){
                message.success("保存成功")
                localStorage.clear()
            }else{
                message.warning("存储失败")
            }
        }
        )
    }




    render() {
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
    {this.state.names? <div className="submit"><DetermineButton text="确定" onClick={this.handleSubmitClick}/></div>:''}
            </div>
        )
    }
}
