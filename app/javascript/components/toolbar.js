import React from 'react';
import { connect } from 'react-redux';
import Buttons from './buttons.js'
import { editMode } from '../actions/actions.js'

class Toolbar extends React.Component{
  

  render(){
    let buttons = null;
    return (
      <div className="buttons">
      <Buttons disabled={!this.props.editMode}/>
      <button type="button" data-toggle="button" className="btn btn-secondary edit" onClick={this.props.onEditButtonClick}><i className="fa fa-pencil fa-2x" aria-hidden="true"></i></button>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    editMode: state.getIn(["manual", "edit_mode"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditButtonClick: () => {
      dispatch(editMode());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Toolbar);
