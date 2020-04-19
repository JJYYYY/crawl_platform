import React, { Component } from 'react'
import { Input } from 'antd';
import EditableTable from '../editableTable'
import DetermineButton from '../determineButton'
import './index.less'


export default class CrawlTableAdd extends Component {
    state={
        tableNameState:true
    }

    handleClick = () => {
        let state = !this.state.tableNameState;
        this.setState({
            tableNameState: state
        });
      };

    render() {
        return (
            <div className="crawl-table-add">
<div className="crawl-table-name">
          <Input
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
              {this.state.tableNameState ? '' : <EditableTable />}
            </div>
        )
    }
}
