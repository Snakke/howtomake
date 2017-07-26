import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

class TextBlock extends React.Component{
  eventLogger(e: MouseEvent, data: Object) {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  render(){
    return (
      <Draggable
        onStop={this.eventLogger}
      >          
      <div className="block" style={{ top: this.props.data.x, left: this.props.data.y, height: this.props.data.height, width: this.props.data.width }}  >
        {this.props.data.content}
      </div>
    </Draggable>
    )
  }
};

TextBlock.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TextBlock;
