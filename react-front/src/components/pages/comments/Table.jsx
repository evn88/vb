import "./Table.scss";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Paginate from "../../Paginate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.onPage = this.onPage.bind(this);
    this.state = {
      currentPage: 1,
      totalPages: null,
      pageLimit: 15,
      comments: []
    }
  }

  //ставим первую страницу если был выполнен поиск
  componentDidUpdate = (prevProps) => {
    if (this.props.searchCount > 0 && this.state.currentPage !== 1 && prevProps !== this.props) {
      this.setState( {
         currentPage: 1
      });
      this.forceUpdate();
    }
  }

  // склоняет слово записи
  numberDeclension = (number, word = 'запис') => {
    if (!typeof($number) === 'number') throw `Value is not integer: ${number}`.toString();
    if (number === 0 || number >= 5 ) return word + "ей";
    if (number === 1) return word + "ь";
    if (number >= 2 && number <= 4) return word + "и";
  }

  // запоминаем номер страницы по которой был клик
  onPage = page => {
    this.setState({
      currentPage: page,
    });
  }

  getHighlightedText(text, highlight) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map(
      (part, index) => part.toLowerCase() === highlight.toLowerCase()
        ? <b key={index} className="highlight">{part}</b>
        : part
    )}</span>;
  }

  render() {
    const { pageLimit, currentPage } = this.state;
    const offset = (currentPage - 1) * pageLimit;
    const comments = this.props.comments.slice(offset, offset + pageLimit);

    const currentRecords = comments.length;
    const totalRecords = this.props.comments.length;

    let table = (
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
        {comments.map(({ _source }) => {
          return (
            <tr key={_source.id}>
              <td>{ _source.id }</td>
              <td>{ _source.postId }</td>
              <td>{ this.getHighlightedText(_source.name, this.props.searchInput) }</td>
              <td>{ this.getHighlightedText(_source.email, this.props.searchInput) }</td>
              <td>
                <Link to={`/comment/${_source.id}`} className="btn btn-arrow">
                  <FontAwesomeIcon icon="arrow-right" />
                </Link>
              </td>
            </tr>
            );
          })}
      </tbody>
    </table>
    )

    return (
      <Fragment>
        <div className="pagination-group">
          <span className="total-records">Показано {currentRecords} {this.numberDeclension(currentRecords)} из { totalRecords }</span>
        </div>

        { (currentRecords) ? table : <p>Нет записей для отображения</p> }

        <Paginate
          totalRecords={totalRecords}
          pageLimit={pageLimit}
          currentPage={currentPage}
          onPageChanged={this.onPage}
        />
      </Fragment>
    );
  }
}