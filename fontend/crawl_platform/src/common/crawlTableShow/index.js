import React, { Component } from 'react'
import { Descriptions } from 'antd';
import WrapperSelect from '../wrapperSelect'
import EditableTable from '../editableTable'
import './index.less'

export default class CrawlTableShow extends Component {
    state={
        selectVal:'abc'
    }
    handleChange=(val)=>{
        this.setState({
            selectVal:val
        })
    }

    render() {
        const data=[{
            value:'abc',
            text:'abc'
        },
        {
            value:'abcd',
            text:'abcd'
        }]
        return (
            <div className="crawl-table-show">
                <div className="crawl-table-name">
                    <WrapperSelect
                        data={data}
                        defaultValue={data[0].value}
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
                <EditableTable />
            </div>
        )
    }
}
