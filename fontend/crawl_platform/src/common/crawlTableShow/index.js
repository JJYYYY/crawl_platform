import React, { Component } from 'react'
import { Button,message } from 'antd'
import WrapperSelect from '../wrapperSelect'
import EditableTable from '../editableTable'
import {getTable} from '../../api'
import {createTable} from '../../api'
import './index.less'

export default class CrawlTableShow extends Component {
    state={
        selectVal:'',
        data:[],
        tableData:[]
    }
    handleChange=(val)=>{
        this.setState({
            selectVal:val
        },()=>{
            getTable(this.state.selectVal).then(
                res=>{
                    this.setState({
                        tableData:JSON.parse(res.data),
                    })
                }
            )
        })
    }

componentDidMount(){
    getTable().then(
        res=>{
            this.setState({
                data:res.data
            },()=>{
                if (this.state.data.length>0){
                getTable(this.state.data[0].value).then(
                    res=>{
                        this.setState({
                            tableData:JSON.parse(res.data),
                            selectVal:this.state.data[0].value
                        })
                    }
                )}
            })
        }
    )
}


handleDropClick=()=>{
    createTable(this.state.selectVal,"",'DELETE').then(
      res=>{
        if (res.statusCode===200){
          message.success("删除成功")
          getTable().then(
            res=>{
                this.setState({
                    data:res.data
                },()=>{
                    if (this.state.data.length>0){
                    getTable(this.state.data[0].value).then(
                        res=>{
                            this.setState({
                                tableData:JSON.parse(res.data),
                                selectVal:this.state.data[0].value
                            })
                        }
                    )}
                })
            }
        )
        }else{
          message.warning("删除失败，请检查该表")
        }
      }
    )
  }

    render() {
        return (
            <div className="crawl-table-show">
                {this.state.data.length>0 ? 
                <div>
                 <div className="crawl-table-name">
                 <WrapperSelect
                     data={this.state.data}
                     value={this.state.selectVal}
                     onChange={(value)=>this.handleChange(value)}
                     width="80"
                 /></div>
                 <div className="edit-btn" style={{marginTop:"10px"}}>
          <Button
          onClick={this.handleDropClick}
          type="primary"
      >
        删除
      </Button>
      </div>
                <EditableTable type='add' name={this.state.selectVal}  dataSource={this.state.tableData} 
                count={this.state.tableData.length>0 ? this.state.tableData.slice(-1)[0].key : 0}
                />
                </div>
                : ""}               
            </div>
        )
    }
}
