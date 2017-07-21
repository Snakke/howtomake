import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { deletePage } from '../actions/actions.js';
import Page from './page.js';

const Pages = ({ pages, onPageClick }) => (
  <ul>
    {pages.map(page =>
      <Page
        key={page.id}
        {...page}
        onClick={() => onPageClick(page.id)}
      />
    )}
  </ul>
);

Pages.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  onPageClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    pages: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageClick: (id) => {
      dispatch(deletePage(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pages);


