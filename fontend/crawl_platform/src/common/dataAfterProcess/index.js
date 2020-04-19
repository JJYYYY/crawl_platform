import React, { Component } from 'react'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Switch,Input } from 'antd';
import './index.less'

export default class DataAfterProcess extends Component {
    state= {
        checked:false
    }
    onChange=(checked) =>{
        this.setState({
            checked:checked
        })
    }

    render() {
        return (
            <div className="first-request-data-after-process">
                <div className="first-request-data-after-process-wrapper">
         <Switch
             checkedChildren={<CheckOutlined />}
             defaultChecked={false}
             onChange={this.onChange}
             unCheckedChildren={<CloseOutlined />}
         />
            <span>url处理</span></div>
            {this.state.checked ?
            <div className="first-request-data-after-process-url-process">
              <div className="first-request-data-after-process-url-process-replace">
                  <span>替换</span><Input placeholder="用$$分隔，如../$$/，表示将返回结果中所有的../替换为/,可写多个，多个规则用@@分隔，替换顺序与输入一致" />
                </div>
                <div className="first-request-data-after-process-url-process-splicing">
                <span>拼接</span><Input placeholder="格式如下'https://www.bilibili.com/video/%s?p=61%params',params为上次返回的结果" />
                </div>
                </div>
            :''}
            </div>
        )
    }
}
