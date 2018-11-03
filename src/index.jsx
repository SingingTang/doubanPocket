import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Detail from './detailContainer';
import {HashRouter, Route} from 'react-router-dom';


ReactDOM.render(
  
  (<HashRouter>
    <div>
        <Route exact path="/" component={App} />
        <Route exact path="/detail/:index" component={Detail} />
        </div>
    </HashRouter>),
  document.getElementById('root')
)
