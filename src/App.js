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
  };
  handlePageChange = pageNumber => {
    this.setState({
      currentPage: pageNumber,
      disabledNext: false,
    });
  };
  handlePagePrev = () => {
    this.setState({
      currentPage: this.state.currentPage - 1,
    });
  };
  handlePageNext = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  };
  render() {
    const { currentPage, itemsPerPage } = this.state;
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
        <button disabled={currentPage === 1} onClick={this.handlePagePrev}>
          Prev
        </button>
        <button
          disabled={currentPage === Math.ceil(Countries.length / itemsPerPage)}
          onClick={this.handlePageNext}
        >
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
