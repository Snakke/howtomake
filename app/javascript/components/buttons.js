import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage } from '../actions/actions.js';

const PageButtons = ({ manual_id, dispatch }) => {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-secondary" onClick={() => {
        const title = prompt("Please enter title", "");
        if (title != null) {
            dispatch(createPage(manual_id, title));
        }
        
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

const mapStateToProps = (state) => {
  return {
    manual_id: state.getIn(["manual", "manual_id"]),
  };

};

export default connect(
  mapStateToProps,
  undefined)(PageButtons);

