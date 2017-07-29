import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span>::::</span>);

const Page = SortableElement(({ onKeyPress, onClick, title, position, id }) => 
  <div className="page" onClick={onClick} onKeyPress={(e) => {
    let key = e.keyCode || e.charCode;
    if( key == 127 ){
      onKeyPress();
    }
  }} tabIndex="0">
    <DragHandle />
    {position}
  </div>
);

Page.propTypes = {
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

export default Page;
