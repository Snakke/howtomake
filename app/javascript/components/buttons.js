import React from 'react';
import PropTypes from 'prop-types';
import AddPageButton from './buttons/add_page_button.js'
import AddTextButton from './buttons/add_text_button.js'
import AddImageButton from './buttons/add_image_button.js'
import AddVideoButton from './buttons/add_video_button.js'


class Buttons extends React.Component{
  render(){
    if (!this.props.editMode) { return null}
    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        <AddPageButton onClick={this.props.onAddPageClick} />
        <AddTextButton onClick={this.props.onAddTextClick} />
        <AddImageButton onClick={this.props.onAddImageClick} />
        <AddVideoButton />
      </div>
    );
  }
}

export default Buttons;
