import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {  Menu } from 'antd';
import { HomeOutlined, BugOutlined, BarChartOutlined } from '@ant-design/icons';

class HeaderMenu extends Component {
    render() {
        return (
            <div>
 <Menu
     defaultSelectedKeys={[1]}
     mode="horizontal"
     style={{height:'50px'}}
     theme="light"
 >
            <Menu.Item
                key="1"
                style={{height:'50px'}}
            >
             <Link to="/home"> <HomeOutlined />
              <span className="nav-text">主页 </span>
              </Link>
            </Menu.Item>
            <Menu.Item
                key="2"
                style={{height:'50px'}}
            >
              <Link to="/crawl">
              <BugOutlined />
              <span className="nav-text">爬虫 </span>
              </Link>
            </Menu.Item>
            <Menu.Item
                key="3"
                style={{height:'50px'}}
            >
                 <Link to="/data">
              <BarChartOutlined />
              <span className="nav-text">数据 </span>
              </Link>
            </Menu.Item>
          </Menu>
            </div>
        )
    }
}
export default withRouter(HeaderMenu)