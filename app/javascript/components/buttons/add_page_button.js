import React from 'react';
import PropTypes from 'prop-types';

const AddPageButton = ({ onClick }) => {
  return <button type="button" className="btn btn-secondary" onClick={onClick} ><i className="fa fa-plus fa-2x" aria-hidden="true"></i></button>
}

AddPageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddPageButton;