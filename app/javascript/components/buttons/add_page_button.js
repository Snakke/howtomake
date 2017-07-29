import React from 'react';
import PropTypes from 'prop-types';

const AddPageButton = ({ onClick, disabled }) => {
  return <button type="button" className="btn btn-secondary" onClick={onClick} disabled={disabled}>Add Page</button>
}

AddPageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddPageButton;