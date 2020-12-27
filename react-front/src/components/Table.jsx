import "./Table.scss";
import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Table extends React.Component {
  render() {
    return (
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
          <tr>
            <td>1</td>
            <td>1</td>
            <td>Egor</td>
            <td>evn88@yandex.ru</td>
            <td><button className="btn btn-default">подробнее</button></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Table;