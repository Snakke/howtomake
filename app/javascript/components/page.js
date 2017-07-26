import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ onKeyPress, onClick, title, position, id }) => {
  let handleKeyPress = (e) => {
    let key = e.keyCode || e.charCode;
    if( key == 127 ){
      onKeyPress();
    }
  }
  return (
  <div className="page" onClick={onClick} onKeyPress={handleKeyPress} tabIndex="0">
    {position}
  </div>
  )
};

Page.propTypes = {
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

export default Page;
