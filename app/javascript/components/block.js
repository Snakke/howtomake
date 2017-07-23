import React from 'react';
import PropTypes from 'prop-types';

const Block = ({ data }) => {
  return (
  <div className="Block" style={{position: 'relative', top: "50px", left: "50px"}}  >
    {data.content}
  </div>
  )
};

Block.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Block;


