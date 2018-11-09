import React, { Component } from 'react';
import Home from './home/home';
import Detail from './detail/detailContainer';
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
  