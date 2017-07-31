import React from 'react';
import PropTypes from 'prop-types';

const AddTextButton = ({ onClick , disabled}) => {
  return <button type="button" className="btn btn-secondary" onClick={onClick} disabled={disabled}><i className="fa fa-text-height fa-2x" aria-hidden="true"></i></button>
}

AddTextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddTextButton;