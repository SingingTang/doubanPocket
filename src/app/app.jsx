import React, { Component } from 'react';
import Home from './home/home';
// import Detail from './detail/detailContainer';
import { HashRouter, Route } from 'react-router-dom';
import Detail from './detail/detailContainer'


export default class App extends Component {
    render() {
        return (<HashRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="detail/:id" component={Detail} />
                {/* <Route exact path="/detail/:index" component={Detail} />
                <Route exact path="/music/detail/:index" component={MusicDetail} />
                <Route exact path="/music" component={Music} />
                <Route exact path="/book" component={Book} />
                <Route exact path="book/detail/:index" component={BookDetail} />
                <Route exact path="/movie" component={Movie} />
                <Route exact path="movie/detail/:index" component={MovieDetail} /> */}
            </div>
        </HashRouter>)
    }
}


// import React from 'react';
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';

// const history = createHistory();

// import App from 'containers';

// // 按路由拆分代码
// import Loadable from 'react-loadable';

// const MyLoadingComponent = ({ isLoading, error }) => {
//     // Handle the loading state
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }
//     // Handle the error state
//     else if (error) {
//         return <div>Sorry, there was a problem loading the page.</div>;
//     }
//     else {
//         return null;
//     }
// };
// const AsyncHome = Loadable({
//     loader: () => import('./home/home'),
//     loading: MyLoadingComponent
// });

// const AsyncDetail = Loadable({
//     loader: () => import('./detail/detailContainer'),
//     loading: MyLoadingComponent
// });

// // 路由配置
// class RouteMap extends React.Component {
//     render() {
//         return (
//             <Router history={history}>
//                 <App>
//                     <Switch>
//                         <Route path="/" exact component={AsyncHome} />
//                         {/* <Route path="/city" component={AsyncCity} /> */}
//                         {/* <Route path="/search/:category/:keywords?" component={AsyncSearch} /> */}
//                         <Route path="/detail/:index" component={AsyncDetail} />
//                         {/* <Route path="/user" component={AsyncUser} /> */}
//                         {/* <Route path="/empty" component={null} key="empty" /> */}
//                         {/* <Route component={AsyncNotFound} /> */}
//                     </Switch>
//                 </App>
//             </Router>
//         );
//     }
// }

// export default RouteMap;
