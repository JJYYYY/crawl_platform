import React, { Component } from 'react'
import { Tabs } from 'antd';
import { EyeTwoTone,FileAddTwoTone } from '@ant-design/icons';
import CrawlTableShow from '../../common/crawlTableShow'
import CrawlTableAdd from '../../common/crawlTableAdd'


const { TabPane } = Tabs;

export default class CrawlTable extends Component {


    callback=(key)=>{
        console.log(key)
    }
    render() {
        return (
            <div className="crawl-table">
                <Tabs defaultActiveKey="1"
                    onChange={this.callback}
                >
    <TabPane key="1"
        tab={<span>
            <EyeTwoTone />
            查看
        </span>}
    >
     <CrawlTableShow />
    </TabPane>
    <TabPane key="2"
        tab={
            <span>
                <FileAddTwoTone />
                新增
            </span>
        }
    >
      <CrawlTableAdd />
    </TabPane>
  </Tabs>,
            </div>
        )
    }
}
