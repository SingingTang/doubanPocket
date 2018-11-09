import React, { Component } from 'react';
import Home from './home';
import Detail from './detailContainer';
import {HashRouter, Route} from 'react-router-dom';


export default class App extends Component{
    render () {
        return (<HashRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/detail/:index" component={Detail} />
                </div>
            </HashRouter>)
    }
}
  