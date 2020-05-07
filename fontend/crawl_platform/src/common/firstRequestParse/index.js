import React, { Component } from 'react'
import DataPreProcess from '../dataPreProcess'
import UrlExtraction from '../urlExtraction'
import {inject,observer} from 'mobx-react'
import DataAfterProcess from '../dataAfterProcess'
import WrapperSelect from '../wrapperSelect'
import {debug} from '../../api'
import DebugButton from '../debugButton'
import './index.less'

export default @inject(
    stores=>({
        changeActive:stores.debug.changeActive,
        changeText:stores.debug.changeText
    })
)
@observer
class FirstRequestParse extends Component {
    state={
        code:'utf-8',
    }

    componentDidMount(){
        const code=localStorage.getItem("code")
        this.setState({
            code
        })
    }

    handleClick=()=>{
        const urls=localStorage.getItem("urls")
        const name=localStorage.getItem("name")
        const code=this.state.code
        debug('detailParse',{name,urls,code}).then(
            res=>{
                this.props.changeActive()
                this.props.changeText(res.data)
                localStorage.setItem('detailPageHtml',res.data)
            }
        )
    }

    handleChange=(val)=>{
        this.setState({
            code:val
        })
        localStorage.setItem("code",val)
    }

    render() {
        return (
            <div className="first-request-parse">
                <DataPreProcess />
                <UrlExtraction />
                <DataAfterProcess />
               <div className="submit">
               <div className="url-encoding">
            <span>网页编码方式</span>
            <WrapperSelect
                data={[
                        {value:'utf-8',
                            text:'utf-8'
                        },
                        {
                            value:'gbk',
                            text:'gbk'
                        },{
                            value:'gb2312',
                            text:'gb2312'
                        }
                    ]}
                onChange={this.handleChange}
                value={this.state.code}
                width="80"
            /></div>
                   <DebugButton  onClick={this.handleClick}  text="调试"/>
                </div>
            </div>
        )
    }
}
