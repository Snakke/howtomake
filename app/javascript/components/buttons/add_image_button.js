import React from 'react';
import PropTypes from 'prop-types';

const AddImageButton = ({ onClick, disabled }) => {
  return <button type="button" className="btn btn-secondary" onClick={onClick} disabled={disabled}>Add Image</button>
}

AddImageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddImageButton;