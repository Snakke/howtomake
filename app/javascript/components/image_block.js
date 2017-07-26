import React from 'react';
import PropTypes from 'prop-types';

const ImageBlock = ({ data }) => {
  return (
  <div className="image_block" style={{ top: data.x, left: data.y, height: data.height, width: data.width }}  >
    <img src={data.content} />
  </div>
  )
};

ImageBlock.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ImageBlock;
