import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortPages } from '../actions/actions.js';
import Pages from './pages.js';

class PagesList extends React.Component {
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      pages: arrayMove(this.props.pages, oldIndex, newIndex),
    });
    this.props.sortPages(this.props.pages[oldIndex].id , oldIndex + 1, newIndex + 1);
  };
  render() {
    return (
      <div className="preview col-2"> 
        <Pages pages={this.props.pages} onSortEnd={this.onSortEnd} useDragHandle={true} disabled={!this.props.editMode}/>
      </div>
    )
  }
}

PagesList.propTypes = {
  pages: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editMode: state.getIn(["manual", "edit_mode"]),
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(PagesList);