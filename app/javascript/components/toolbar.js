import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editMode, createPage, createTextBlock, createImageBlock } from '../actions/actions.js'
import Buttons from './buttons.js'
import '../cloudinary.js';

class Toolbar extends React.Component{
  render(){
    let buttons = null;
    if (!this.props.canEdit){ return null }
    return (
      <div className="buttons">
        <Buttons editMode={this.props.editMode}
          onAddPageClick={() => this.props.onAddPageClick()}
          onAddTextClick={() => this.props.onAddTextClick()}
          onAddImageClick={() => this.props.onAddImageClick()}/>
        <button 
          type="button"
          data-toggle="button"
          className="btn btn-secondary edit"
          onClick={this.props.onEditButtonClick}
        ><i className="fa fa-pencil fa-2x" aria-hidden="true"></i></button>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    editMode: state.getIn(["manual", "edit_mode"]),
    canEdit: state.getIn(["manual", "can_edit"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditButtonClick: () => {
      dispatch(editMode());
    },
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
  mapDispatchToProps)(Toolbar);
