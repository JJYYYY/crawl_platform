import React, { Component } from 'react';
import { Radio } from 'antd';
import './index.less';


/*接收 4个props
buttonStyle
defaultValue
handleRadioChange
data
*/
export default class WrapperRadio extends Component {
    render() {
        return (

            <Radio.Group
                disabled={this.props.disabled ? this.props.disabled : false}
                buttonStyle={this.props.buttonStyle}
                defaultValue={this.props.defaultValue}
                onChange={this.props.onChange}
            >
                {this.props.data.map((item,index)=>{
                  return (  <Radio.Button
                      key={index}
                      value={item.value}
                            >
                    {item.text}
                 </Radio.Button>)
                })}
                    </Radio.Group>
        )
    }
}
