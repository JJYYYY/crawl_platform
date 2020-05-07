import React, { Component } from 'react'
import { Table, Button,message} from 'antd';
import {EditableRow} from './EditableRow'
import {EditableCell} from './EditableCell'
import {createTable} from '../../api'
import './index.less'

export default class EditableTable extends Component {
    constructor(props) {
      super(props);
      this.columns = this.props.type==='new' ?  [
        {
          title: '字段名',
          dataIndex: 'name',
          editable: true,
          align:'center'
        },
        {
          title: '字段类型',
          dataIndex: 'type',
          editable: true,
          align:'center'
        },
        {
          title: '字段说明',
          dataIndex: 'explain',
          editable: true,
          align:'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align:'center',
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
                <Button danger
                    onClick={() => this.handleDelete(record.key)}
                    size="small"
                    type="primary"
                >Delete</Button>
            ) : null
        }
      ] :
      [
        {
          title: '字段名',
          dataIndex: 'name',
          align:'center'
        },
        {
          title: '字段类型',
          dataIndex: 'type',
          align:'center'
        },
        {
          title: '字段说明',
          dataIndex: 'explain',
          align:'center'
        }
      ]


      this.state = {
        dataSource: [
        ],
        count: 0
      };
    }

    componentDidMount(){
      this.setState({
        dataSource:this.props.dataSource.length>0 ?  this.props.dataSource : [],
        count:this.props.count ? this.props.count : 0
      })
    }

    componentWillReceiveProps(nextprops){
      this.setState({
        dataSource:nextprops.dataSource.length>0 ?  nextprops.dataSource : [],
        count:nextprops.count ? nextprops.count : 0
      })
    }



    handleSubmit=()=>{
      if (typeof this.props.changeState==='function'){
        this.props.changeState()
      }
      if (!this.props.name || this.state.dataSource.length===0){
        message.warning('表名和表字段不能为空')

      }else{
      createTable(this.props.name,this.state.dataSource,'POST').then((res)=>{
        res.statusCode===200 ? message.success('创建成功') : this.props.type==='new' ?  message.warning('该表已存在，无须重复创建') : message.success('修改成功')
      })}
    }

    handleDelete = key => {
      const dataSource = [...this.state.dataSource];
      this.setState({
        dataSource: dataSource.filter(item => item.key !== key)
      });
    };

    handleAdd = () => {
      const { count, dataSource } = this.state;
      const newData = {
        key: count,
        name: 'title',
        type: 'varchar(64)',
        explain: '标题名'
      };
      this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1
      });
    };

    handleSave = row => {
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      this.setState({
        dataSource: newData
      });
    };




    render() {
      const { dataSource } = this.state;
      const components = {
        body: {
          row: EditableRow,
          cell: EditableCell
        }
      };
      const columns = this.columns.map(col => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave
          })
        };
      });
      return (
        
        <div className="edit-table">
      {this.props.type==='new'?
          <div><div className="edit-btn">
          <Button
              onClick={this.handleAdd}
              type="primary"
          >
            增加一列
          </Button>
          <Button
              onClick={this.handleSubmit}
              type="primary"
          >
            提交
          </Button>
          </div>
          <Table
              bordered
              columns={columns}
              components={components}
              dataSource={dataSource}
              pagination={false}
              rowClassName={() => 'editable-row'}
          /></div> :
          <div>
      <Table
          bordered
          columns={columns}
          components={components}
          dataSource={dataSource}
          pagination={false}
          rowClassName={() => 'editable-row'}
      /></div>
    }
        </div>
      );
    }
  }