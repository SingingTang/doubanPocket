import React from 'react';
import {Router,Route,browserHistory} from 'react-router-dom';

import Home from './app.jsx';
import Detail from './detail.jsx';

const history = browserHistory;
const Routes=()=>(
    <Router history={browserHistory}>
        <Route path='home' component={Home}/>
        <Route path='detail' component={Detail}/>
    </Router>
)

export default Routes;
