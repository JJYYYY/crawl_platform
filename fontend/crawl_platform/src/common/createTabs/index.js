import React, { Component } from 'react';
import { Input } from 'antd';
import WrapperRadio from '../wrapperRadio'
import { BugTwoTone } from '@ant-design/icons';
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
    requestType: 'GET'
  };
  handleCrawlNameClick = () => {
    let state = !this.state.crawlNameState;
    this.setState({
      crawlNameState: state
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

  render() {
    const data=[{value:'GET',text:'GET'},{value:'POST',text:'POST'}]
    return (
      <div className="crawl-content">
        <div className="crawl-name">
          <Input
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
              data={data}
              defaultValue={this.state.requestType}
              onChange={this.handleRadioChange}
          />
            {this.state.requestType === 'GET' ? (
              <GetRequest />
            ) : (
              <PostRequest />
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
