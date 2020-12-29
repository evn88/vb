import "./CommentItem.scss";
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
    const item = this.state.comments;
    return (
      <div className="comment-item">
        <h1>Comment Details</h1>
        <p><b>id: </b>{id}</p>
        <p><b>name: </b>{item.name}</p>
        <p><b>email: </b>{item.email}</p>
        <p><b>content: </b>{item.body}</p>
        <Link to={'/'} className="btn btn-default">Назад</Link>
      </div>
    )
  }
}