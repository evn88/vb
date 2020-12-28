import "./Json.scss";
import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Json extends React.Component {
  state = {
    comments : []
  };

  componentDidMount = () => {
    // http://localhost:3001/api/v1/
    fetch('http://localhost:3001/api/v1/').then(response => {
      return response.json();
    }).then((data) => {
      this.setState({ comments: data });
      console.log(this.state);
    });
  }

  render() {
    return (
      <pre className="json-container">
        {JSON.stringify(this.state.comments, null, 2)}
      </pre>
    );
  }
}

export default Json;