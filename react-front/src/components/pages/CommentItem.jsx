import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      comments: [],
      format: 'table',
      isLoaded: false
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/api/v1/comment/'+this.props.id).then(response => {
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

  render() {
    const { id } = this.props;
    return (
      <h1>Comment Details {id}</h1>
    )
  }
}