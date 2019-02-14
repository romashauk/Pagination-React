import React, { Component, Fragment } from 'react';
import ListItem from 'material-ui/List/ListItem';
import List from 'material-ui/List';
import Countries from './countries.json';
import AppBar from 'material-ui/AppBar';

import Pagination from './Pagination';

export default class App extends Component {
  state = {
    currentPage: 1,
    itemsPerPage: 10,
    disabledNext: false,
    disabledPrev: false,
  };
  handlePageChange = pageNumber => {
    this.setState(
      {
        currentPage: pageNumber,
        disabledNext: false,
      },
      () =>
        this.setState({
          disabledPrev: this.state.currentPage === 1 ? true : false,
          disabledNext:
            Math.ceil(Countries.length / this.state.itemsPerPage) ===
            this.state.currentPage
              ? true
              : false,
        })
    );
  };
  handlePagePrev = () => {
    const { currentPage } = this.state;
    if (currentPage <= 2) {
      this.setState({
        disabledPrev: true,
      });
    }
    this.setState({
      currentPage: currentPage - 1,
      disabledNext: false,
    });
  };
  handlePageNext = () => {
    let { itemsPerPage, currentPage } = this.state;
    if (Math.ceil(Countries.length / itemsPerPage) === currentPage) {
      this.setState({
        disabledNext: true,
      });
    } else {
      this.setState({
        currentPage: currentPage + 1,
        disabledPrev: false,
      });
    }
  };
  componentWillMount = () => {
    const { currentPage, itemsPerPage } = this.state;
    if (currentPage === 1) {
      this.setState({
        disabledPrev: true,
      });
    }
    if (Math.ceil(Countries.length / itemsPerPage) <= 1) {
      this.setState({
        disabledNext: true,
      });
    }
  };
  render() {
    const {
      currentPage,
      itemsPerPage,
      disabledPrev,
      disabledNext,
    } = this.state;
    const itemStart = (currentPage - 1) * itemsPerPage;
    const itemEnd = itemStart + itemsPerPage;

    const countriesToShow = Countries.slice(itemStart, itemEnd);
    return (
      <Fragment>
        <AppBar title={'Countries List'} showMenuIconButton={false} />
        <br />
        <List>
          {countriesToShow.map(c => (
            <ListItem key={c}>{c}</ListItem>
          ))}
        </List>
        <br />
        <button disabled={disabledPrev} onClick={this.handlePagePrev}>
          Prev
        </button>
        <button disabled={disabledNext} onClick={this.handlePageNext}>
          Next
        </button>
        <br />
        <Pagination
          perPage={itemsPerPage}
          total={Countries.length}
          onChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </Fragment>
    );
  }
}
