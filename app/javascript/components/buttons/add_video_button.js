import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, } from 'reactstrap';
import { createVideoBlock } from '../../actions/actions.js';
import urlParser from 'js-video-url-parser';

class AddVideoButton extends React.Component{
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
      <div>
        <button type="button" className="btn btn-secondary" onClick={this.toggle} ><i className="fa fa-youtube fa-2x" aria-hidden="true"></i></button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader>Add video:</ModalHeader>
          <Form  onSubmit={e => {
            e.preventDefault();
            let video_url = urlParser.parse(input.value)
            this.props.onAddVideoClick(video_url.id);
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAddVideoClick: (url) => {
      dispatch(createVideoBlock(url));
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps)(AddVideoButton);
  