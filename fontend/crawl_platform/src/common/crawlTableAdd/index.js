import React, { Component } from 'react'
import { Input, message } from 'antd';
// import cookie from 'react-cookies'
import EditableTable from '../editableTable'
import DetermineButton from '../determineButton'
import './index.less'


export default class CrawlTableAdd extends Component {
    state={
        tableNameState:true,
        tableData:[],
        val:'' //表名
    }

    handleClick = () => {
      if (!this.state.val){
        message.warning("请输入表名")
      }else{
        let state = !this.state.tableNameState;
        this.setState({
            tableNameState: state
        });}
      };

    handleChange = (e)=>{
        let val=e.target.value
        this.setState({
            val
        })
      }

    changeState=()=>{
      this.setState({
        tableNameState:true
      })
    }



    render() {
        return (
            <div className="crawl-table-add">
        <div className="crawl-table-name">
          <Input
            onChange={this.handleChange}
              className="crawl-name-input"
              disabled={!this.state.tableNameState}
              placeholder="表名"
          />
            {this.state.tableNameState? <DetermineButton onClick={this.handleClick}
                text="确定"
                                        /> : <DetermineButton
                                            onClick={this.handleClick}
                                            text="编辑"
                                             />}
        </div>
              {this.state.tableNameState ? '' : 
              <EditableTable name={this.state.val} 
              dataSource={this.state.tableData} type='new'/>}
            </div>
        )
    }
}
