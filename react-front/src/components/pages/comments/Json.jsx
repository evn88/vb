import "./Json.scss";
import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Json extends React.Component {
  render() {
    const { comments } = this.props;
    return (
      <pre className="json-container">
        {JSON.stringify(comments, null, 2)}
      </pre>
    );
  }
}

export default Json;