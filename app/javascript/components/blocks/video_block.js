import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';
import { resizeBlock, moveBlock } from '../../actions/actions.js';

class VideoBlock extends React.Component{
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  onMove(event: SyntheticMouseEvent, data: DraggableData) {
    this.props.onBlockMove(this.props.id, data.x, data.y);
  }
  
  onResize(event: MouseEvent, data: Direction, refToElement: HTMLElement, delta: NumberSize,) {
    debugger
    this.props.onBlockResize(this.props.id, data, delta.width, delta.height);
  }

  render(){
    if (!this.props.editMode) {
      return(
        <div className="video_block" style={{ position: "absolute",
                                              top: this.props.data.y,
                                              left: this.props.data.x,
                                              height: this.props.data.height,
                                              width: this.props.data.width }} >
          <iframe
            src={this.props.data.content}
            frameBorder="0" allowFullScreen
          ></iframe>
        </div>
      )
    }
    return (
      <Rnd
        default={{
          x: this.props.data.x,
          y: this.props.data.y,
          width: this.props.data.width,
          height: this.props.data.height,
        }}
        minWidth={50}
        minHeight={50}
        bounds="parent"
        onResizeStop={this.onResize}
        onDragStop={this.onMove}
        dragHandlerClassName={".video-handler"}
      >  
        
        <div className="video_block" >
          <iframe
            src={this.props.data.content}
            frameBorder="0" allowFullScreen
          ></iframe>
        </div>
        <i className="fa fa-arrows video-handler fa-2x" aria-hidden="true"></i> 
      </Rnd>
    )
  }
};

VideoBlock.propTypes = {
  data: PropTypes.object.isRequired,
  onBlockMove: PropTypes.func.isRequired,
  onBlockResize: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editMode: state.getIn(["manual", "edit_mode"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBlockResize: (id, direction, w, h) => {
      dispatch(resizeBlock(id, direction, w, h));
    },
    onBlockMove: (id, x, y) => {
      dispatch(moveBlock(id, x, y));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoBlock);
