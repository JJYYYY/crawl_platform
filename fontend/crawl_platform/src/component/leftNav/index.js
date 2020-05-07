import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {  Menu } from 'antd';
import { FileAddTwoTone,TabletTwoTone } from '@ant-design/icons';

class LeftNav extends Component {
    state={
        activeKey:[1]
    }

    handleClick=(item)=>{
        this.setState({
            activeKey:item.keyPath
        }
        )
    }

    render() {
        return (
            <div className="left-nav">
                <Menu 
                    onClick={this.handleClick}
                    selectedKeys={this.state.activeKey}
                    style={{width:'1rem'}}
                    theme="light"
                >
            <Menu.Item
                key="1"
                style={{height:'50px'}}
            >
             <Link to="/crawl/create"> <FileAddTwoTone />
              <span className="nav-text">新建 </span>
              </Link>
            </Menu.Item>
            <Menu.Item
                key="2"
                style={{height:'50px'}}
            >
            <Link to="/crawl/table">
              <TabletTwoTone />
              <span className="nav-text">数据表 </span>
              </Link> 
            
            </Menu.Item>
          </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)