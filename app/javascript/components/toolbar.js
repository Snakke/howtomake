import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPage } from '../actions/actions.js';

const AddPage = ({ dispatch }) => {
return (
      <button onClick={e => {
        e.preventDefault();
        dispatch(addPage());
      }}>
        Add Page
      </button>
  );
};

AddPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddPage);