import React, { Component } from "react";
import Create from '../../common/create'
import CreateTabs from "../../common/createTabs";
import "./index.less";


export default class Crawl extends Component {
  state = {
    active: false
  };
  changeState=()=>{
    let active=!this.state.active
    this.setState(
      {active}
    )
  }
  render() {
    return <div className="crawl">
      <div className="crawl-wrapper">
      {this.state.active ? <CreateTabs changeState={this.changeState}/> : <Create changeState={this.changeState}/>}
      </div>
    </div>;
  }
}
