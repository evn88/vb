import "./Table.scss";
import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Table extends React.Component {
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
    // this.getData();
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
            {this.state.comments.map(({_source}) => {
              return (
              <tr key={_source.id}>
                <td>{ _source.id }</td>
                <td>{ _source.postId }</td>
                  <td>{ _source.name }</td>
                <td>{ _source.email }</td>
                <td><button className="btn btn-default">подробнее</button></td>
              </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

export default Table;