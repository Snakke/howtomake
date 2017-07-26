import React from 'react';
import PropTypes from 'prop-types';

const VideoBlock = ({ data }) => {
  return (
  <div className="video_block" style={{ top: data.x, left: data.y}}>
    <iframe width="480" height="270"
      src={data.content}
      frameBorder="0" allowFullScreen
    ></iframe>
  </div>
  )
};

VideoBlock.propTypes = {
  data: PropTypes.object.isRequired,
};

export default VideoBlock;
