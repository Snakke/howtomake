import React from 'react';
import PropTypes from 'prop-types';

const AddPageButton = ({ onClick, disabled }) => {
  return <button type="button" className="btn btn-secondary" onClick={onClick} disabled={disabled}><i className="fa fa-plus fa-2x" aria-hidden="true"></i></button>
}

AddPageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddPageButton;