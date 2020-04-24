import React, { Component } from 'react';
import { Input } from 'antd';
import WrapperRadio from '../wrapperRadio'
import { BugTwoTone } from '@ant-design/icons';
import cookie from 'react-cookies'
import GetRequest from '../getRequest';
import PostRequest from '../postRequest';
import FirsetRequestParse from '../firstRequestParse';
import DetailRequestParse from '../detailRequestParse'
import DetermineButton from '../determineButton'
import './index.less';

export default class CreateTabs extends Component {
  state = {
    crawlNameState: true,
    crawlFirstRequestValue: '请求方式',
    requestType: 'GET',
    name:"",
    disable:false
  };

  changeRadioState=()=>{ //更改单选框是否可以切换
    this.setState({
      disabled:!this.state.disabled
    })
  }


  //爬虫名字
  handleCrawlNameClick = () => {
    let state = !this.state.crawlNameState;
    this.setState({
      crawlNameState: state,
    },()=>{
      if(!this.state.crawlNameState)
      {cookie.save("name",this.state.name)}
    });
    };



  handleMenuClick = (e) => {
    let value = e.target.value;
    this.setState({
      crawlFirstRequestValue: value
    });
  };

  handleRadioChange = (e) => {
    this.setState({
      requestType: e.target.value
    });
  };

  handleChange=(e)=>{
    let name=e.target.value
    this.setState({
      name
    })
  }
  
  componentDidMount(){//从cookie加载数据
    let name=cookie.load("name")
    console.log("name",name)
    this.setState({
      name
    },()=>{//如果input的内容不为空，更改状态
      if(this.state.name){
        this.setState({
          crawlNameState:false
        })
      }
    })
  }
  
  render() {
    
    const data=[{value:'GET',text:'GET'},{value:'POST',text:'POST'}]
    return (
      <div className="crawl-content">
        <div className="crawl-name">
          <Input
            value={this.state.name}
              onChange={this.handleChange}
              className="crawl-name-input"
              disabled={!this.state.crawlNameState}
              placeholder="爬虫名字"
              prefix={<BugTwoTone />}
          />


            {this.state.crawlNameState ? <DetermineButton onClick={this.handleCrawlNameClick}
                text="确定"
                                         /> : <DetermineButton
                                             onClick={this.handleCrawlNameClick}
                                             text="编辑"
                                              />}
        </div>
        <div className="crawl-first-step">
          <div className="crawl-first-step-name">第一步</div>
          <div className="crawl-first-step-content">
          <WrapperRadio buttonStyle="solid"
              disabled={this.state.disabled}
              data={data}
              defaultValue={this.state.requestType}
              onChange={this.handleRadioChange}
          />
            {this.state.requestType === 'GET' ? (
              <GetRequest changeRadioState={this.changeRadioState}/>
            ) : (
              <PostRequest changeRadioState={this.changeRadioState}/>
            )}
          </div>
          </div>
          <div className="crawl-second-step">
          <div className="crawl-second-step-name">第二步</div>
          <div className="crawl-second-step-content">
            <FirsetRequestParse />
          </div>
          </div>
          <div className="crawl-third-step">
          <div className="crawl-third-step-name">第三步</div>
          <div className="crawl-third-step-content">
            <DetailRequestParse />
          </div>
          </div>
        </div>
    );
  }
}
