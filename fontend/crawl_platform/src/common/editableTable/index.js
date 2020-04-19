import React, { Component } from 'react'
import { Table, Button} from 'antd';
import {EditableRow} from './EditableRow'
import {EditableCell} from './EditableCell'
import './index.less'

export default class EditableTable extends Component {
    constructor(props) {
      super(props);
      this.columns = [
        {
          title: '字段名',
          dataIndex: 'name',
          width: '30%',
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
          editable: true
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
      ];
      this.state = {
        dataSource: [
          {
            key: '0',
            name: 'Edward King 0',
            type: '32',
            explain: 'London, Park Lane no. 0'
          },
          {
            key: '1',
            name: 'Edward King 1',
            type: '32',
            explain: 'London, Park Lane no. 1'
          }
        ],
        count: 2
      };
    }

    handleSubmit=()=>{

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
          <div className="edit-btn">
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
          />
        </div>
      );
    }
  }