import "./Paginate.scss";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Paginate extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="pagination">
          <Link to="/" className="btn btn-link">
            <FontAwesomeIcon icon="angle-left" />
          </Link>
          <Link to="/" className="btn btn-link">1</Link>
          <Link to="/" className="btn btn-link">2</Link>
          <Link to="/" className="btn btn-link">...</Link>
          <Link to="/" className="btn btn-link">5</Link>
          <Link to="/" className="btn btn-link">6</Link>
          <Link to="/" className="btn btn-link">
            <FontAwesomeIcon icon="angle-right"/>
          </Link>
        </div>
      </div>
    );
  }
}

export default Paginate;