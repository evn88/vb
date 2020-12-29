/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Paginate.scss";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Paginate extends React.Component {
  constructor(props) {
    super(props);
    // this.fetchPageNumbers = this.fetchPageNumbers.bind(this);
    this.state = {
      currentPage: 1,
      totalRecords: (this.props.totalRecords) ? this.props.totalRecords : null,
      pageLimit: (this.props.pageLimit) ? this.props.pageLimit : 30,
      pageNeighbours: (this.props.pageNeighbours) ? this.props.pageNeighbours : 0
    };

    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';


    // this.pageNeighbours = typeof pageNeighbours === 'number'
    //   ? Math.max(0, Math.min(pageNeighbours, 2))
    //   : 0;

  }

  componentDidMount() {
    this.gotoPage(1);
  }

  range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  }

  gotoPage = (page) => {
    this.setState({ currentPage: page });
    this.props.onPageChanged(page);
    console.log(page);
  }

  fetchPageNumbers = () => {
    this.totalPages = Math.ceil(this.props.totalRecords / this.props.pageLimit);
    return [ ...this.range(1, this.totalPages) ]
  }

  handleClick = page => e => {
    e.preventDefault();
    this.gotoPage(page);
  }

  render() {
    if (!this.props.totalRecords || this.totalPages === 1) return null;
    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();


    return (
      <div className="container">
        <nav aria-label="Pagination">
            <ul className="pagination">
              <li className="page-item">
                <Link to={'#'} className="btn btn-paginate">
                  <FontAwesomeIcon icon="angle-left" />
                </Link>
              </li>
            {pages.map((page, index) => {
                return (
                  <li key={index}>
                    <Link to={'#'}
                      className={`btn btn-paginate ${currentPage === page ? ' active' : ''}`}
                      onClick={this.handleClick(page)}
                    >{page}</Link>
                  </li>
                );
              })}
              <li className="page-item">
                <Link to={'#'} className="btn btn-paginate">
                  <FontAwesomeIcon icon="angle-right" />
                </Link>
              </li>
            </ul>
        </nav>
      </div>
    );
  }
}