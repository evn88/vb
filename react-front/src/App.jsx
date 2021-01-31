import "./App.scss";
import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Clock from "./components/Clock";
// import Home from './components/pages/Home';
// import NotFound from './components/pages/NotFound';
// import CommentItem from './components/pages/comments/CommentItem';
const Home = lazy(() => import('./components/pages/Home'));
const NotFound = lazy(() => import('./components/pages/NotFound'));
const CommentItem = lazy(() => import('./components/pages/comments/CommentItem'));

library.add(fas)

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
          <Suspense fallback={<div>Загрузка...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
                <Route
                  path="/comment/:id"
                  render={({ match }) => <CommentItem id={match.params.id} />}>
                </Route>
              <Route exact path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
          </BrowserRouter>
          <Clock />
        </header>
      </div>
    );
  }
}