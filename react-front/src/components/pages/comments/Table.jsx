import "./Table.scss";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Paginate from "../../Paginate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.onPage = this.onPage.bind(this);
    this.state = {
      currentPage: 1,
      totalPages: null,
      pageLimit: 20,
      comments: []
    }
  }

  numberDeclension = (number, word = 'запис') => {
    if(!typeof($number) === 'number') throw `Value is not integer: ${number}`.toString();
    if (number === 0 || number >= 5 ) return word + "ей";
    if (number === 1) return word + "ь";
    if (number >= 2 && number <= 4) return word + "и";
  }

  onPage = page => {
    this.setState({
      currentPage: page,
    });
  }

  render() {
    const { pageLimit, currentPage } = this.state;
    const offset = (currentPage - 1) * pageLimit;
    const comments = this.props.comments.slice(offset, offset + pageLimit);

    const currentRecords = comments.length;
    const totalRecords = this.props.comments.length;

    return (
      <Fragment>
        <div className="pagination-group">
          <span className="total-records">Показано {currentRecords} {this.numberDeclension(currentRecords)}</span>
          <Paginate
            totalRecords={totalRecords}
            pageLimit={pageLimit}
            onPageChanged={this.onPage}
          />
        </div>

        <table className="table__elk">
          <thead>
            <tr>
              <th>id</th>
              <th>post_id</th>
              <th>name</th>
              <th>email</th>
              <th></th>
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
                  <td>
                      <Link
                        to={`/comment/${_source.id}`}
                        className="btn btn-arrow"
                      >
                      <FontAwesomeIcon icon="arrow-right" />
                    </Link>
                  </td>
                </tr>
                );
              })}
          </tbody>
        </table>

        <Paginate
          totalRecords={totalRecords}
          pageLimit={pageLimit}
          onPageChanged={this.onPage}
        />
      </Fragment>
    );
  }
}

export default Table;