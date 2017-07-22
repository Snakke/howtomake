import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removePage } from '../actions/actions.js';
import Page from './page.js';

const Pages = ({ pages, onPageClick }) => (
  <div className="pages">
  <div className="preview">
    {pages.map(page =>
      <Page
        key={page.id}
        {...page}
        onClick={() => onPageClick(page.id)}
      />
    )}
  </div>
  
  </div>
);

Pages.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,   
  }).isRequired).isRequired,
  onPageClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    pages: state.getIn(["manual", "pages"]).toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageClick: (id) => {
      dispatch(removePage(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Pages);


