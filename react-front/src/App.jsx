import "./App.scss";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from './components/Table';
import Json from './components/Json';
import InputForm from "./components/InputForm";
import Clock from "./components/Clock";
import CommentItem from "./components/pages/CommentItem";


library.add(fas)

const appName = "Search comments";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormat = this.handleFormat.bind(this);
    this.state = {
      error: null,
      comments: [],
      format: 'table',
      isLoaded: false
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/api/v1/').then(response => {
      return response.json();
    }).then((data) => {
      this.setState({
        comments: data,
        isLoaded: true
      });

      console.log(data);
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
      console.log(error);
    });
  }

  handleSearch = (search) => {
    console.log(search);
  }

  handleFormat(format) {
    this.setState({ format: format });
    console.log(format);
  }


  render() {

    const { error, isLoaded , comments, format } = this.state;
    let content;
    if (error) {
      content = <div className="error">Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      content = <div><FontAwesomeIcon icon="spinner" spin /></div>
    } else if (format === 'table') {
      content = <Table comments={comments} />
    } else {
      content = <Json comments={ comments } />
      console.log(format)
    }


    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Route exact path="/">
              <h1>{appName}</h1>
              <InputForm
                onSearch={this.handleSearch}
                onFormat={this.handleFormat}
                format={format}
              />

              {content}

            </Route>

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

export default App;
