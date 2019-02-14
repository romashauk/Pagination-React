import React, { Component } from 'react';

export default class Pagination extends Component {
  renderPagination() {
    const { perPage, total, onChange } = this.props;
    const pagesCount = Math.ceil(total / perPage);
    return Array.from(Array(pagesCount), (v, i) =>
      i + 1 === this.props.currentPage ? (
        <button className="active" key={i} onClick={() => onChange(i + 1)}>
          {i + 1}
        </button>
      ) : (
        <button key={i} onClick={() => onChange(i + 1)}>
          {i + 1}
        </button>
      )
    );
  }
  render() {
    return <div>{this.renderPagination()}</div>;
  }
}
