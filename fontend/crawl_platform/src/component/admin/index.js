import React, { Component } from 'react';
import { Layout } from 'antd';
import {Redirect, Route, Switch} from 'react-router-dom'
import HeaderMenu from '../headerMenu'
import Home from '../home'
import Crawl from '../crawl'
import Data from '../data'
import NotFound from  '../notfound'
import ShowResult from '../../common/showResult'
import './index.less'

const { Content, Footer } = Layout;

export default class Admin extends Component {


  render() {
    return (
      <Layout className="layout"
          theme="light"
      >
    <HeaderMenu />
    <Content className="site-layout"
        theme="light"
    >
<ShowResult />
    <Switch>
              <Redirect exact
                  from="/"
                  to="/home"
              />
              <Route component={Home}
                  path="/home"
              />
              <Route component={Crawl}
                  path="/crawl"
              />
              <Route component={Data}
                  path="/data"
              />
              <Route component={NotFound}/>
            </Switch>
    </Content>
    <Footer style={{ textAlign: 'center' }}
        theme="light"
    >Create by WiseJason</Footer>
    </Layout>
    )
  }
}
