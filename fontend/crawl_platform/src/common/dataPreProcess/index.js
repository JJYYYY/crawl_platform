import React, { Component } from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Switch,Input } from 'antd';
import './index.less'

export default class DataPreProcess extends Component {
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
            <div className="first-request-data-pre-process">
        <div className="first-request-data-pre-proces-switch">
         <Switch
             checkedChildren={<CheckOutlined />}
             defaultChecked={false}
             onChange={this.onChange}
             unCheckedChildren={<CloseOutlined />}
         />
            <span>数据预处理</span></div>
            {this.state.checked ?
            <div className="first-request-data-pre-proces-replace"> <span>替换</span>
            <Input placeholder="替换规则，用$$分隔，如<a href>$$<a>，表示将返回结果中所有的<a href>替换为<a>,可写多个，多个规则用@@分隔，替换顺序与输入一致" />
            </div>
            :''}
            </div>
        )
    }
}
