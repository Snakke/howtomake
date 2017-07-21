import React, { PropTypes } from 'react';

const Page = ({ onClick, text }) => (
  <div className="page"
    onClick={onClick}
  >
    {text}
  </div>
);

Page.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.number.isRequired,
};

export default Page;