import React, { Component } from 'react'
import { Descriptions } from 'antd';
import WrapperSelect from '../wrapperSelect'
import EditableTable from '../editableTable'
import {getTable} from '../../api'
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
                        selectVal:this.state.data[0].value
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
                        // let result=[]
                        // result.push(res.data)
                        
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






    render() {
        return (
            <div className="crawl-table-show">
                {this.state.data.length>0 ? 
                <div>
                 <div className="crawl-table-name">
                 <WrapperSelect
                     data={this.state.data}
                     defaultValue={this.state.data[0].value}
                     onChange={this.handleChange}
                     width="80"
                 /></div>
                   <div className="crawl-table-desc"> <Descriptions bordered
                       column={2}
                       size="middle"
                                                      >
                            <Descriptions.Item label="表名">Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="数据条数">Prepaid</Descriptions.Item>
                            <Descriptions.Item label="最新更新时间"
                                span={2}
                            >2018-04-24 18:00:00</Descriptions.Item>
                             <Descriptions.Item label="使用爬虫列表"
                                 span={2}
                             >{'policy'}</Descriptions.Item>
                    </Descriptions>
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
