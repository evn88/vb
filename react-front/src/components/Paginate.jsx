import "./Paginate.scss";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Paginate extends React.Component {
  render() {
    return (
      <div className="pagination">
        <FontAwesomeIcon icon="angle-left" /> 1 2 3 ... 6 7 <FontAwesomeIcon icon="angle-right" />
      </div>
    );
  }
}

export default Paginate;