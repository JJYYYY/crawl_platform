import React, { Component } from "react";
import { Input, Button, Radio } from "antd";
import { BugTwoTone } from "@ant-design/icons";
import GetRequest from "../getRequest";
import PostRequest from "../postRequest";
import FirsetRequestParse from "../firstRequestParse";
import "./index.less";

export default class CreateTabs extends Component {
  state = {
    crawlNameState: true,
    crawlFirstRequestValue: "请求方式",
    requestType: "GET",
  };
  handleCrawlNameClick = () => {
    let state = !this.state.crawlNameState;
    this.setState({
      crawlNameState: state,
    });
  };
  handleMenuClick = (e) => {
    let value = e.target.value;
    this.setState({
      crawlFirstRequestValue: value,
    });
  };

  handleRadioChange = (e) => {
    this.setState({
      requestType: e.target.value,
    });
  };

  render() {
    return (
      <div className="crawl-content">
        <div className="crawl-name">
          <Input
            className="crawl-name-input"
            placeholder="爬虫名字"
            prefix={<BugTwoTone />}
            disabled={!this.state.crawlNameState}
          />
          <Button
            className="crawl-name-button"
            type="primary"
            onClick={this.handleCrawlNameClick}
          >
            {this.state.crawlNameState ? "确定" : "编辑"}
          </Button>
        </div>
        <div className="crawl-first-request">
          <Radio.Group
            className="crawl-first-request-group"
            buttonStyle="solid"
            defaultValue={this.state.requestType}
            onChange={this.handleRadioChange}
          >
            <Radio.Button value="GET" className="crawl-first-request-group-get">
              GET
            </Radio.Button>
            <Radio.Button
              value="POST"
              className="crawl-first-request-group-post"
            >
              POST
            </Radio.Button>
          </Radio.Group>
          <div className="crawl-first-request-item">
            {this.state.requestType === "GET" ? (
              <GetRequest />
            ) : (
              <PostRequest />
            )}
          </div>
          <div className="crawl-first-request-parse">
            <FirsetRequestParse />
          </div>
        </div>
      </div>
    );
  }
}
