import React, { Component } from 'react'
import { Input, Button } from 'antd';

export default class Type1 extends Component {
    state={
        typeActive:false
    }

    handleChange=(value)=>{
        console.log(value)
    }
    handleClick=()=>{
        let state=!this.state.typeActive
        this.setState({
            typeActive:state
        })
    }
    render() {
        return (
            <div className='type1'>
                <div className='type-selector'><span>CSS选择器:</span>
                <Input placeholder="用于取得所有详情页的选择器" className='type1-selector-input' />
                </div>
                <div className='type-href-selector'><span>属性值:</span>
                <Input placeholder="用于获取详情页链接的选择器" className='type1-href-selector-input' />
                </div>
                <div className='type-url-edit'><h3>Url:</h3>
                <span>替换:</span><Input placeholder="url字符串替换，可以填写多个替换规则，用分号分开,规则用:分开，前面为条件，后面为需要执行的替换"/>
                <span>拼接:</span> <Input placeholder="用于url拼接" className='type1-href-selector-input' />
                </div>
                <Button className='type-edit-button' size='middle' type='primary' onClick={this.handleClick}>
            {this.state.typeActive ? "编辑" :"确定"}
            </Button>
                <Button className='type1-debug-button' size='middle' type='primary' >
                调试
            </Button>
            </div>
        )
    }
}
