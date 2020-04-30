import React, { Component } from 'react'
import { Tabs } from 'antd';
import { EyeTwoTone,FileAddTwoTone } from '@ant-design/icons';
import CrawlTableShow from '../../common/crawlTableShow'
import CrawlTableAdd from '../../common/crawlTableAdd'


const { TabPane } = Tabs;

export default class CrawlTable extends Component {
    state={
        activeKey:1
    }

    callback=(key)=>{
        this.setState({
            activeKey:key
        })
    }
    render() {
        return (
            <div className="crawl-table">
                <Tabs defaultActiveKey="1"
                keyboard={ true }
                    onChange={this.callback}
                >
    <TabPane key="1"
        tab={<span>
            <EyeTwoTone />
            查看
        </span>}
    >
    {this.state.activeKey==='1' ? <CrawlTableShow />  : <div></div>} 
    </TabPane>
    <TabPane key="2"
        tab={
            <span>
                <FileAddTwoTone />
                新增
            </span>
        }
    >
    {this.state.activeKey==='2' ? <CrawlTableAdd />  : <div></div>} 
    </TabPane>
  </Tabs>,
            </div>
        )
    }
}
