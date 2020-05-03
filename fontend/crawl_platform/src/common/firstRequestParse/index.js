import React, { Component } from 'react'
import DataPreProcess from '../dataPreProcess'
import UrlExtraction from '../urlExtraction'
import DetermineButton from '../determineButton'
import DataAfterProcess from '../dataAfterProcess'
import DebugButton from '../debugButton'
import './index.less'

export default class FirstRequestParse extends Component {

    handleRadioChange=(e)=>{
        let value=e.target.value
        this.setState({
            firstRequestParseType:value
        })
    }



    render() {
        return (
            <div className="first-request-parse">
                <DataPreProcess />
                <UrlExtraction />
                <DataAfterProcess />
               <div className="submit"> <DetermineButton
                   text="确定" /><DebugButton  onClick={this.handleClick}  text="调试"/>
                </div>
            </div>
        )
    }
}
