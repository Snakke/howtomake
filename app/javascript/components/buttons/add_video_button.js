import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createVideoBlock } from '../../actions/actions.js';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, } from 'reactstrap';
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
        <button type="button" className="btn btn-secondary" onClick={this.toggle} disabled={this.props.disabled}><i className="fa fa-youtube fa-2x" aria-hidden="true"></i></button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader>Add video:</ModalHeader>
          <Form  onSubmit={e => {
            e.preventDefault();
            let video_url = urlParser.parse(input.value)
            this.props.onAddVideoClick("https://www.youtube.com/embed/"+video_url.id);
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
//https://www.youtube.com/embed/Q0oIoR9mLwc
export default connect(
  undefined,
  mapDispatchToProps)(AddVideoButton);