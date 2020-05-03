import React, { Component } from 'react'
import { Select } from 'antd';


const { Option } = Select;

/*接收4个props
data:用于生成opetion 类型为数组，数组中每个元素为对象，对象含有2个key，为value text
onChange:方法，接收一个value参数，用于改变选中的值
defaultValue:为默认显示的值
width:标签宽度
*/
export default class WrapperSelect extends Component {


    render() {
        return (
            <Select defaultValue={this.props.defaultValue}
                value={this.props.value}
                onChange={(value)=>this.props.onChange(value)}
                style={{ width: this.props.width }}
            >
                {this.props.data.map((item,index)=>{
                    return   <Option key={index}
                        value={item.value}
                             >{item.text}</Option>
                })}
            </Select>
        )
    }
}
