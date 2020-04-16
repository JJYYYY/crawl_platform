import React, { Component } from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from '../component/home'


export default class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
            <Route path="/" component={Home}></Route>
            </BrowserRouter>
        )
    }
}
