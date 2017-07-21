import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPage } from '../actions/actions.js';

const PageButtons = ({ dispatch }) => {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-secondary" onClick={e => {
        e.preventDefault();
        dispatch(addPage());
      }}>
        Add Page
      </button>
      <button type="button" className="btn btn-secondary">
        Add Text
      </button>
      <button type="button" className="btn btn-secondary">
        Add Image
      </button>
      <button type="button" className="btn btn-secondary">
        Add Video
      </button>
    </div>
  );
};

PageButtons.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(PageButtons);