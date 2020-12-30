/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Paginate.scss";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Paginate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecords: (this.props.totalRecords) ? this.props.totalRecords : null,
      pageLimit: (this.props.pageLimit) ? this.props.pageLimit : 30,
      pageNeighbours: (this.props.pageNeighbours) ? this.props.pageNeighbours : 0
    };
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
    this.props.onPageChanged(page);
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
    const { currentPage } = this.props;
    const pages = this.fetchPageNumbers();
    const dottedBtn = <li><Link to={'#'} className="btn btn-paginate" disabled>...</Link></li>
    if (!this.props.totalRecords || this.totalPages === 1) return null;

    return (
      <div className="container">
        <nav aria-label="Pagination">
            <ul className="pagination">
              <li>
                <Link to={'#'} className="btn btn-paginate" onClick={this.handleClick( (currentPage > 1) ? currentPage - 1 : currentPage )}>
                  <FontAwesomeIcon icon="angle-left" />
                </Link>
              </li>

              {
                pages.map((page, index) => {
                  if (page === 1) {
                    return (
                      <Fragment key={index}>
                        <li key={index}>
                          <Link to={'#'}
                            className={`btn btn-paginate ${currentPage === page ? ' active' : ''}`}
                            onClick={this.handleClick(page)}
                            key={index}
                          >{page}</Link>
                        </li>
                        { (currentPage > 5) ? dottedBtn : null }
                      </Fragment>
                    )
                  }

                  if (page < currentPage + 4 && page > currentPage - 4) {
                    return (
                      <li key={index}>
                        <Link to={'#'}
                          className={`btn btn-paginate ${currentPage === page ? ' active' : ''}`}
                          onClick={this.handleClick(page)}
                          key={index}
                        >{page}</Link>
                      </li>
                    )
                  }

                  if (this.totalPages === page) {
                    return (
                      <Fragment key={index}>
                        { dottedBtn }
                        <li key={index}>
                          <Link to={'#'}
                            className={`btn btn-paginate ${currentPage === page ? ' active' : ''}`}
                            onClick={this.handleClick(page)}
                            key={index}
                          >{page}</Link>
                        </li>
                      </Fragment>
                    )
                  }
                })
              }

              <li>
                <Link to={'#'} className="btn btn-paginate" onClick={this.handleClick( (currentPage < this.totalPages) ? currentPage + 1 : currentPage )}>
                  <FontAwesomeIcon icon="angle-right" />
                </Link>
              </li>
            </ul>
        </nav>
      </div>
    );
  }
}