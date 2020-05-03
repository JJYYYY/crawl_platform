import React, { Component } from 'react'
import { CloseCircleTwoTone } from 'antd'

export default class ShowResult extends Component {
    state={
        active:false
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            active:true
        })
    }

    handleClick=()=>{
        this.setState({
            active:false
        })
    }
    
    render() {
        const {active}=this.state
        return 
            (
                <div className='show-result'>
                    { this.state.active ? (<div className='show-result-content'>
                        <CloseCircleTwoTone  onClick={this.handleClick}/>
            <div className='content'>{ this.props.text}</div>
                    </div>) : ""}
                </div>
            )
}
}
