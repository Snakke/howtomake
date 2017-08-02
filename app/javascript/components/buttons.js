import React from 'react';
import AddPageButton from './buttons/add_page_button.js'
import AddTextButton from './buttons/add_text_button.js'
import AddImageButton from './buttons/add_image_button.js'
import AddVideoButton from './buttons/add_video_button.js'
import { connect } from 'react-redux';
import { createPage, createTextBlock, createImageBlock } from '../actions/actions.js';
import '../cloudinary.js';

class Buttons extends React.Component{
  render(){
    if (!this.props.disabled) { return null}
    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        <AddPageButton onClick={() => this.props.onAddPageClick()} />
        <AddTextButton onClick={() => this.props.onAddTextClick()} />
        <AddImageButton onClick={() => this.props.onAddImageClick()} />
        <AddVideoButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    manual_id: state.getIn(["manual", "manual_id"]),
    position: state.getIn(["manual", "current_page"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPageClick: () => {
      dispatch(createPage());
    },
    onAddTextClick: () => {
      dispatch(createTextBlock())
    },
    onAddImageClick: () => {
      cloudinary.openUploadWidget({ cloud_name: 'snake', upload_preset: 'cobgfeow'}, 
        (error, result) => { 
          if (result != null) {
            dispatch(createImageBlock(result[0]));
          }
        }
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Buttons);
