import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Admin from '../component/admin'


export default class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
            <Switch>
            <Route component={Admin}
                path="/"
            />
            </Switch>
            </BrowserRouter>
        )
    }
}
