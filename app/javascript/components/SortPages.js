import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removePage } from '../actions/actions.js';
import { selectCurrentPage } from '../actions/actions.js';

const DragHandle = SortableHandle(() => <span>::::</span>);

const Page = SortableElement(({ onKeyPress, onClick, title, position, id }) => 
  <div className="page" onClick={onClick} onKeyPress={(e) => {
    let key = e.keyCode || e.charCode;
    if( key == 127 ){
      onKeyPress();
    }
  }} tabIndex="0">
    <DragHandle />
    {position}
  </div>
);

Page.propTypes = {
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

const SortablePages = SortableContainer(({pages, onPageClick, onKeyDeleteDown}) => {
  return (
    <div className="preview">
      {pages.map((page, index) => (
        <Page
          key={page.id}
          index={index}
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

export default connect(undefined, mapDispatchToProps)(SortablePages);