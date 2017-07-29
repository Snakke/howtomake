import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortPages } from '../actions/actions.js';
import SortablePages from './SortPages.js';

class SortableComponent extends Component {
  onSortEnd = ({oldIndex, newIndex}) => {
    debugger
    this.setState({
      pages: arrayMove(this.props.pages, oldIndex, newIndex),
    });
    this.props.sortPages(this.props.pages[oldIndex].id , oldIndex + 1, newIndex + 1);
  };
  render() {
    return <SortablePages pages={this.props.pages} onSortEnd={this.onSortEnd} transitionDuration={500} useDragHandle={true}/>;
  }
}

SortableComponent.propTypes = {
  pages: PropTypes.array.isRequired,
};


const mapDispatchToProps = (dispatch) => {
  return {
    sortPages: (id, oldPosition, newPosition) => {
      dispatch(sortPages(id, oldPosition, newPosition));
    },
    onPageClick: (id) => {
      dispatch(selectCurrentPage(id));
    },
    onKeyDeleteDown: (id) => {
      dispatch(removePage(id))
    },
  };
};

export default connect(undefined, mapDispatchToProps)(SortableComponent);