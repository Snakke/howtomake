import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ onClick, title, position }) => (
  <div className="page" onClick={onClick}>
    {position}
  </div>
);

Page.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

export default Page;