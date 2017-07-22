import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ onClick, title }) => (
  <div className="page" onClick={onClick}>
    {title}
  </div>
);

Page.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Page;