import React from 'react';
import PropTypes from 'prop-types';
import TextBlock from './text_block.js'
import ImageBlock from './image_block.js'
import VideoBlock from './video_block.js'

const CurrentPage = ({ title, position, blocks }) => {
  let pagesBlocks = blocks.map((block) => {  
    switch (block.type){
      case 'Text':
        return <TextBlock key={block.id} {...block} />;
      case 'Image':
        return <ImageBlock key={block.id} {...block} />;
      case 'Video':
        return <VideoBlock key={block.id} {...block} />;
      default:
        return null;  
    };
  });
  return (
    <div className="currentPage" >
      <div className="header">{title}</div>
        {pagesBlocks}
      <div className="footer">{position}</div>
    </div>
  );
};

CurrentPage.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.number,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object.isRequired,   
  }).isRequired).isRequired,
};

export default CurrentPage;
