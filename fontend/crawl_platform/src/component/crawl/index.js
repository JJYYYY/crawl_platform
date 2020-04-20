import React, { Component } from 'react';
import { Layout } from 'antd'
import {Redirect, Route, Switch} from 'react-router-dom'
import CrawlCreate from '../crawlCreate'
import CrawlTable from '../crawlTable'
import LeftNav from '../leftNav'
import NotFound from  '../notfound'
import './index.less';


const { Sider, Content } = Layout
export default class Crawl extends Component {

  render() {
    return (
      <Layout style={{height:'100%'}}>
        <Sider width='1rem'>
          <LeftNav/>
        </Sider>
        <Content>
        <Switch>
        <Redirect exact
            from="/crawl"
            to="/crawl/create"
        />
              <Route component={CrawlCreate}
                  path="/crawl/create"
              />
               <Route component={CrawlTable}
                   path="/crawl/table"
               />
              <Route component={NotFound}/>
            </Switch>
        </Content>
        </Layout>
    )

  }
}
