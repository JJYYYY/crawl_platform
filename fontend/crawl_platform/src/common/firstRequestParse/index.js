import React, { Component } from 'react'
import { Radio } from 'antd';
import Type1 from '../type1'
import Type2 from '../type2'
import Type3 from '../type3'
import './index.less'

export default class FirstRequestParse extends Component {
    state={
        firstRequestParseType:"Type1"
    }


    handleRadioChange=(e)=>{
        let value=e.target.value
        this.setState({
            firstRequestParseType:value
        })
    }


    renderTag=()=>{
        let result=''
        switch (this.state.firstRequestParseType){
            case "Type1":
                result=<Type1 />
                break
                case "Type2":
                result=<Type2 />
                break
                case "Type3":
                 result=<Type3 />
                 break
                 default:
                 break
        }
        return result
    }

    render() {
        console.log("firstRequestParseType",this.state.firstRequestParseType)
        return (
            <div className='first-request-parse'>
                <Radio.Group className='first-request-parse-group' buttonStyle='solid' onChange={this.handleRadioChange}  defaultValue={this.state.firstRequestParseType}>
          <Radio.Button value="Type1" className='crawl-first-request-group-item'>Type1</Radio.Button>
          <Radio.Button value="Type2" className='crawl-first-request-group-item'>Type2</Radio.Button>
          <Radio.Button value="Type3" className='crawl-first-request-group-item'>Type3</Radio.Button>
          </Radio.Group>
            {this.renderTag()}
            </div>
        )
    }
}
