import React, { Component } from 'react'
import { Input } from 'antd';

export default class Type2 extends Component {
    render() {
        return (
            <div className='type2'>
                <span>替换:</span><Input placeholder="url字符串替换，可以填写多个替换规则，用分号分开,规则用:分开，前面为条件，后面为需要执行的替换"/>
                <span>拼接:</span> <Input placeholder="用于url拼接" className='type1-href-selector-input' />
            </div>
        )
    }
}
