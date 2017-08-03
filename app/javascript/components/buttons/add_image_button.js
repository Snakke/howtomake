import React from 'react';
import PropTypes from 'prop-types';

const AddImageButton = ({ onClick }) => {
  return <button type="button" className="btn btn-secondary" onClick={onClick} ><i className="fa fa-picture-o fa-2x" aria-hidden="true"></i></button>
}

AddImageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddImageButton;