import React, { Component } from 'react'
import { Table } from 'antd';

export default class Home extends Component {
  state={
    selectedRows:[]
  }
  columns = [
    {
      title: '爬虫名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '最近执行时间',
      dataIndex: 'lastExecutionTime',
      key: 'lastExecutionTime',
    },
    {
      title: '数据量',
      dataIndex: 'dataVolume',
      key: 'dataVolume',
    },
    {
      title: '定时任务',
      dataIndex: 'dataVolume',
      key: 'dataVolume',
    },
  ];
  
  data = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }   
  ];
  
  // rowSelection objects indicates the need for row selection
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        selectedRows
      })
    },
  };
  render() {
    console.log(this.state.selectedRows)
    return (
      <Table columns={this.columns} rowSelection={this.rowSelection} dataSource={this.data} />
    )
  }
}





