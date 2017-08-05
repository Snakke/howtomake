import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SortableContainer } from 'react-sortable-hoc';
import { removePage, selectCurrentPage } from '../actions/actions.js';
import Page from './page.js'

const Pages = SortableContainer(({pages, onPageClick, onKeyDeleteDown, disabled}) => {
  if (disabled) { onKeyDeleteDown = () => { return null } }
  return (
    <div className="pages-list">
      {pages.map((page, index) => (
        <Page
          key={page.id}
          index={index}
          disabled={disabled}
          {...page}
          onClick={() => onPageClick(page.id)}
          onKeyPress={() => onKeyDeleteDown(page.id)}
        />
      ))}
    </div>
  );
});

const mapDispatchToProps = (dispatch) => {
  return {
    onPageClick: (id) => {
      dispatch(selectCurrentPage(id));
    },
    onKeyDeleteDown: (id) => {
      dispatch(removePage(id))
    },
  };
};

export default connect(undefined, mapDispatchToProps)(Pages);