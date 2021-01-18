import "./CommentItem.scss";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Services from "./../../../Services";

export default class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      comment: [],
      isLoaded: false
    }
  }

  componentDidMount = () => {
    const services = new Services();
    services.getComment(this.props.id).then(
      (data) => {
        this.setState({
          comment: data,
          isLoaded: true
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
        console.error('error: ', error);
      }
    )
  }

  render() {
    const { error, isLoaded , comment } = this.state;
    if (error) {
      return (
        <div className="comment-item">
          <h1>Comment Details</h1>
          <p className="error">Ошибка загрузки</p>
          <Link to={'/'} className="btn btn-default"><FontAwesomeIcon icon="arrow-left" /> Назад</Link>
        </div>
      )
    } else if (!isLoaded) {
      return <div><FontAwesomeIcon icon="spinner" spin /></div>
    } else {
      return (
        <div className="comment-item">
          <h1>Comment Details</h1>
          <div className="content">
            <p><b>id: </b>{comment.id}</p>
            <p><b>postId: </b>{comment.postId}</p>
            <p><b>name: </b>{comment.name}</p>
            <p><b>email: </b>{comment.email}</p>
            <p><b>content: </b>{comment.body}</p>
          </div>
          <Link to={'/'} className="btn btn-default"><FontAwesomeIcon icon="arrow-left" /> Назад</Link>
        </div>
      )
    }

  }
}