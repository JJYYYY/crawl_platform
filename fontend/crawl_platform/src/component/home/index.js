import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, BugOutlined, BarChartOutlined } from '@ant-design/icons';
import Crawl from '../crawl';
import Show from '../show';
import Data from '../data';
import './index.less'

const { Content, Footer, Header } = Layout;

export default class Home extends Component {
  state = {
    activeIndex: 1
  };

  handleClick = (index) => {
    this.setState({
      activeIndex: index
    });
  };

  renderMenu=()=>{
    let result=''
   switch (this.state.activeIndex) {
      case 1:
        result= <Show />
        break;
        case 2:
          result= <Crawl />
        break;
        case 3:
          result= <Data />
        break;
      default:
        break;
    }
    return result
  }

  render() {
    return (
      <Layout theme="light" className="layout">
    <Header style={{backgroundColor:"White"}}>
      <Menu
              defaultSelectedKeys={[this.state.activeIndex]}
              mode="horizontal"
              theme="light" style={{height:"50px"}}
          >
            <Menu.Item
                key="1"
                style={{height:"50px"}}
                onClick={() => {
                this.handleClick(1);
                
              }}
            >
              <HomeOutlined />
              <span className="nav-text">主页 </span>
            </Menu.Item>
            <Menu.Item
                key="2"
                style={{height:"50px"}}
                onClick={() => {
                this.handleClick(2);
              }}
            >
              <BugOutlined />
              <span className="nav-text">爬虫 </span>
            </Menu.Item>
            <Menu.Item
                key="3"
                style={{height:"50px"}}
                onClick={() => {
                this.handleClick(3);
              }}
            >
              <BarChartOutlined />
              <span className="nav-text">数据 </span>
            </Menu.Item>
          </Menu>
          </Header>
    <Content className="site-layout" theme="light">
    {
              this.renderMenu()
            }
    </Content>
    <Footer style={{ textAlign: 'center' }} theme="light">Create by WiseJason</Footer>
    </Layout>
    )
  }
}
