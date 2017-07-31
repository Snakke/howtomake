import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <i className="fa fa-bars fa-2x draghandle" aria-hidden="true"></i>);

const Page = SortableElement(({ onKeyPress, onClick, title, position, id }) => 
  <div className="page" onClick={onClick} onKeyPress={(e) => {
    let key = e.keyCode || e.charCode;
    if( key == 127 ){
      onKeyPress();
    }
  }} tabIndex="0">
    <DragHandle />
    <p>{position}. {title}</p>
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
