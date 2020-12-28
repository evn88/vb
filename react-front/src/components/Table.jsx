import "./Table.scss";
import React from "react";
import Paginate from "./Paginate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Table extends React.Component {
  render() {
    const { comments } = this.props;
    // this.getData();
    return (
      <div>
        <Paginate />
        <table className="table__elk">
          <thead>
            <tr>
              <th>id</th>
              <th>post_id</th>
              <th>name</th>
              <th>email</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
              {comments.map(({_source}) => {
                return (
                <tr key={_source.id}>
                  <td>{ _source.id }</td>
                  <td>{ _source.postId }</td>
                    <td>{ _source.name }</td>
                  <td>{ _source.email }</td>
                  <td><button className="btn btn-default"><FontAwesomeIcon icon="arrow-right" /></button></td>
                </tr>
                );
              })}
          </tbody>
        </table>

        <Paginate />
        </div>
    );
  }
}

export default Table;