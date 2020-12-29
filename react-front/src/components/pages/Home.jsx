import React, { Component, Fragment }from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from './comments/Table';
import Json from './comments/Json';
import InputForm from "./comments/InputForm";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleFormat = this.handleFormat.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      error: null,
      commentsOriginal: [],
      comments: [],
      format: 'table',
      isLoaded: false
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/api/v1/comments/').then(response => {
      return response.json();
    }).then((data) => {
      this.setState({
        commentsOriginal: data,
        comments: data,
        isLoaded: true
      });
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
    search = search.toLowerCase();
    const commentsOriginal = this.state.commentsOriginal;
    this.setState({
      comments: commentsOriginal.filter(comment => {
        return (comment._source.name.toLowerCase().indexOf(search) !== -1) || (comment._source.email.toLowerCase().indexOf(search) !== -1);
      })
    });
    // console.log(this.state.comments, search);
  }

  handleFormat(format) {
    this.setState({ format: format });
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
    }


    return (
      <Fragment>
        <h1>Search comments</h1>
        <InputForm
          onSearch={this.handleSearch}
          onFormat={this.handleFormat}
          format={format}
        />
        {content}
      </Fragment>
    );
  }
}
