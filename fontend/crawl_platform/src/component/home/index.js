import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  BugOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import Detail from "../detail"


const { Content, Footer, Sider } = Layout;

export default class Home extends Component {
  state={
    activeIndex:1
  }
    render() {
        return (
        <Layout >
        <Sider theme="light" 
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              < HomeOutlined />
              <span className="nav-text">主页</span>
            </Menu.Item>
            <Menu.Item key="2">
              < BugOutlined />
              <span className="nav-text">爬虫</span>
            </Menu.Item>
            <Menu.Item key="3">
              < BarChartOutlined />
              <span className="nav-text">数据</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }} theme="light">
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Detail />
          </Content>
          <Footer style={{ textAlign: 'center' }}> Created by BXZ</Footer>
    </Layout>
  </Layout>)
    }
}
