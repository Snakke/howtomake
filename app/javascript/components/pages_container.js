import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import PagesList from './pages_list.js';
import CurrentPage from './current_page.js';
import Comments from './comments.js';

const PagesContainer = ({ pages, index, editMode }) => {
  let selectedPage = pages[index];
  let currentPage = null;
  let comments = null;
  if (selectedPage){
    currentPage = <CurrentPage title={selectedPage.title} position={selectedPage.position} blocks={selectedPage.blocks}/>
    comments = <Comments comments={selectedPage.comments}/>
  }
  return (
    <div className="pages row">
      <PagesList pages={pages} editMode={editMode}/>
      {currentPage}
      {comments}
    </div>
  )
};

PagesContainer.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    position: PropTypes.number,
    blocks: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.object.isRequired,   
    }).isRequired).isRequired,
    comments: PropTypes.array.isRequired,  
  }).isRequired).isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    pages: state.getIn(["manual", "pages"]).toJS(),
    index: state.getIn(["manual", "current_page"]),
    editMode: state.getIn(["manual", "edit_mode"]),
  };
};

export default connect(
  mapStateToProps,
  undefined)(PagesContainer);
