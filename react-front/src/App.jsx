import "./App.scss";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Home from "./components/pages/Home";
import CommentItem from "./components/pages/comments/CommentItem";
import Clock from "./components/Clock";
import NotFound from "./components/pages/NotFound";

library.add(fas)

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Switch>
              <Route exact path="/vblob/" component={Home} />
              <Route
                path="/comment/:id"
                render={({ match }) => <CommentItem id={match.params.id}/>} />
              <Route exact path="/vblob/*">
                <NotFound />
              </Route>
            </Switch>
          </BrowserRouter>
          <Clock />
        </header>
      </div>
    );
  }
}