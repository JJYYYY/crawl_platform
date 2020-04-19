import React, {Component} from 'react'
import {Button, Row, Col} from 'antd'
import './index.less'
/*
前台404页面
 */
export default class NotFound extends Component {
  render() {
    return (

      <Row className="not-found">
        <Col className="left"
            span={12}
        ></Col>
        <Col className="right"
            span={12}
        >
          <h1>404</h1>
          <h2>抱歉，你访问的页面不存在</h2>
          <div>
            <Button onClick={() => this.props.history.replace('/home')}
                type="primary"
            >
              回到首页
            </Button>
          </div>
        </Col>
      </Row>
    )
  }
}