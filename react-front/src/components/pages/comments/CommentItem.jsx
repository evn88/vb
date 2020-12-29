import "./CommentItem.scss";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      // console.log(response);
      return response.json();
    }).then(
      (data) => {
        this.setState({
          comments: data,
          isLoaded: true
        });
        // console.log(data);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
        console.error('error: ', error);
      }
    )
  }

  render() {
    const item = this.state.comments;
    const error = this.state.error;
    if (error) {
      return (
        <div className="comment-item">
          <h1>Comment Details</h1>
          <p className="error">Ошибка загрузки</p>
          <Link to={'/'} className="btn btn-default"><FontAwesomeIcon icon="arrow-left" /> Назад</Link>
        </div>
      )
    } else {
      return (
        <div className="comment-item">
          <h1>Comment Details</h1>
          <div className="content">
            <p><b>id: </b>{item.id}</p>
            <p><b>postId: </b>{item.postId}</p>
            <p><b>name: </b>{item.name}</p>
            <p><b>email: </b>{item.email}</p>
            <p><b>content: </b>{item.body}</p>
          </div>
          <Link to={'/'} className="btn btn-default"><FontAwesomeIcon icon="arrow-left" /> Назад</Link>
        </div>
      )
    }

  }
}