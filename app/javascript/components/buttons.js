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
    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        <AddPageButton onClick={() => this.props.onAddPageClick()} disabled={this.props.disabled}/>
        <AddTextButton onClick={() => this.props.onAddTextClick()} disabled={this.props.disabled}/>
        <AddImageButton onClick={() => this.props.onAddImageClick()} disabled={this.props.disabled}/>
        <AddVideoButton disabled={this.props.disabled}/>
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
