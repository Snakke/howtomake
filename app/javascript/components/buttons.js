import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage, createTextBlock, createImageBlock, createVideoBlock } from '../actions/actions.js';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col } from 'reactstrap';
import '../cloudinary.js';

class Buttons extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render(){
    let input =null;
    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary" onClick={() => {
          this.props.dispatch(createPage(this.props.manual_id))
        }}>Add Page</button>
        
        <button type="button" className="btn btn-secondary" onClick={() => {
          this.props.dispatch(createTextBlock(this.props.position));
        }}>Add Text</button>

        <button type="button" className="btn btn-secondary" onClick={() => {
          cloudinary.openUploadWidget({ cloud_name: 'snake', upload_preset: 'cobgfeow'}, 
            (error, result) => { 
              if (result != null) {
                this.props.dispatch(createImageBlock(this.props.position, result[0]));
              }
            });
        }}>Add Image</button>

        <button type="button" className="btn btn-secondary" onClick={this.toggle}>Add Video</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader>Add video:</ModalHeader>
          <Form  onSubmit={e => {
            e.preventDefault();
            this.props.dispatch(createVideoBlock(this.props.position, input.value));
          }}>
            <ModalBody>
              <Label for="url" >Enter please url:</Label>
              <input className="form-control" placeholder="Url" ref={node => { input = node; }}/>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={this.toggle}>Ok</Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

Buttons.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    manual_id: state.getIn(["manual", "manual_id"]),
    position: state.getIn(["manual", "current_page"]),
  };

};

export default connect(
  mapStateToProps,
  undefined)(Buttons);
