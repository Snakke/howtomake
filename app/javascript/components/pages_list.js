import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';
import { sortPages } from '../actions/actions.js';
import Pages from './pages.js';

class PagesList extends React.Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      pages: arrayMove(this.props.pages, oldIndex, newIndex),
    });
    this.props.sortPages(this.props.pages[oldIndex].id , oldIndex + 1, newIndex + 1);
  };
  render() {
    return (
      <div className="preview"> 
        <Pages pages={this.props.pages}
               onSortEnd={this.onSortEnd}
               useDragHandle={true}
               disabled={!this.props.editMode}
        />
      </div>
    )
  }
}

PagesList.propTypes = {
  pages: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortPages: (id, oldPosition, newPosition) => {
      dispatch(sortPages(id, oldPosition, newPosition));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(PagesList);