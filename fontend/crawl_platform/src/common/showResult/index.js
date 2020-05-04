import React, { Component } from 'react'
import {inject,observer} from 'mobx-react'
import { CloseCircleTwoTone } from 'antd';


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
             (<div className='show-result'>
             
                    { this.props.active ? <div className='show-result-content'>
                        <CloseCircleTwoTone  onClick={this.handleClick}/>
            <div className='content'>{ this.props.text}</div>
                    </div> : ""}
                </div> )
        )
          
}
}
