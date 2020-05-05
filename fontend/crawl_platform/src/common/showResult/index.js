import React, { Component } from 'react'
import {CloseSquareTwoTone} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import './index.less'

export default @inject(
    stores=>({
        text:stores.debug.text,
        active:stores.debug.active,
        changeActive:stores.debug.changeActive
    })
)
@observer

 class ShowResult extends Component {


    handleClick=()=>{
      this.props.changeActive()
    }


    render() {
        return (
             (<div className="show-result">

                    {this.props.active ? <div className="show-result-content">
                       <div style={{display:'flex',justifyContent:'flex-end'}}> <CloseSquareTwoTone onClick={this.handleClick}
                           style={{ fontSize: '20px',marginRight:'10px',marginTop:'10px' }}
                                                                                /></div>
            <div className="content"
                dangerouslySetInnerHTML={{__html:this.props.text }}
            />
                    </div> : ''}
                </div> )
        )

}
}
