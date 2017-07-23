import React from 'react';
import PropTypes from 'prop-types';

const CurrentPage = ({ title, position }) => (

  <div className="currentPage" >
    <span>{title}</span><br/>
    <span>{position}</span>
  </div>
);

CurrentPage.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.number,
};

export default CurrentPage;