import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'mobx-react'
import App from './app'
import {Crawl,Debug} from './store'

const renderMethod=!module.hot ? ReactDom.hydrate : ReactDom.render
const stores={
    edit: new Crawl(),
    debug:new Debug()
}

renderMethod(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)


