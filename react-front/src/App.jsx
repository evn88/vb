import "./App.scss";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Home from "./components/pages/Home";
import CommentItem from "./components/pages/comments/CommentItem";
import Clock from "./components/Clock";

library.add(fas)

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route
              path="/comment/:id"
              render={
                ({ match }) => {
                  const { id } = match.params;
                  return <CommentItem id={id}/>;
                }
              } />
          </BrowserRouter>

          <Clock />
        </header>
      </div>
    );
  }
}