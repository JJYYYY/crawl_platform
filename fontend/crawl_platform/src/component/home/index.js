import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import Edit from '../edit'
const { Header, Content, Footer } = Layout;

export default class Home extends Component {
    render() {
        return (
            <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">主页</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Edit></Edit>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        )
    }
}
