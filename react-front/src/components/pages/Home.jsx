import React, { Component, Fragment }from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '../Table';
import Json from '../Json';
import InputForm from "../InputForm";

export default class Home extends Component {
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
