import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';
import { resizeBlock, moveBlock, updateText } from '../../actions/actions.js';
import ContentEditable from 'react-contenteditable';
import marked from 'marked';
import autosize from 'autosize';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

class TextBlock extends React.Component{
  componentWillMount() {
    autosize($('.text-area'));
  }

  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.onMove = this.onMove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onMove(event: SyntheticMouseEvent, data: DraggableData) {
    this.props.onBlockMove(this.props.id, data.x, data.y);
  }
  
  onResize(event: MouseEvent, data: Direction, refToElement: HTMLElement, delta: NumberSize,) {
    this.props.onBlockResize(this.props.id, data, delta.width, delta.height);
  }

  handleChange(){
    if (this.textAreaTimer) { clearTimeout(this.textAreaTimer) }
    console.log(this.textArea.value);
    this.setState({data: this.props.data.content = this.textArea.value});
    this.textAreaTimer = setTimeout(() => { 
      this.props.sendUpdatedText(this.props.id, this.props.data.content);
    }, 2000 );
  }
  
  render(){
    if (!this.props.editMode) {
      return(
        <div dangerouslySetInnerHTML={{ __html: marked(this.props.data.content) }}
             className="text_block" style={{ position: "absolute",
                                             top: this.props.data.y,
                                             left: this.props.data.x,
                                             height: this.props.data.height,
                                             width: this.props.data.width }} >
        </div>
      )
    }
    return (
      <Rnd
        default={{
          x: this.props.data.x,
          y: this.props.data.y,
          width: this.props.data.width,
        }}
        minWidth={50}
        bounds="parent"
        onResizeStop={this.onResize}
        onDragStop={this.onMove}
        enableResizing={
          {
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: true,
            right: true,
            top: false,
            topLeft: false,
            topRight: false,
          }
        }
        dragHandlerClassName={".text-handler"}
      >  
      <div className="text-handler" ></div>
      <textarea 
        className="block text-area"
        value={this.props.data.content}
        onChange={this.handleChange}
        ref={(input) => { this.textArea = input; }}
        onKeyDown={() => {autosize($('.text-area'))}}
      ></textarea>
    </Rnd>
    )
  }
};

TextBlock.propTypes = {
  data: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,   
  }.isRequired).isRequired,
  onBlockMove: PropTypes.func.isRequired,
  onBlockResize: PropTypes.func.isRequired,
  sendUpdatedText: PropTypes.func.isRequired,
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
    sendUpdatedText: (id, content) => {
      dispatch(updateText(id, content));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextBlock);
