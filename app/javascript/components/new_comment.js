import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendComment } from '../actions/actions.js';
import autosize from 'autosize';

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.comment = this.comment.bind(this);
  }
  comment(){
    this.props.onCommentSend(this.textArea.value)
    this.textArea.value='';
  }

  render(){
    return (
      <div className="new-comment">
        <textarea  className="post" placeholder="Enter comment"
          ref={(input) => { this.textArea = input; }}
          onKeyDown={() => {autosize($('.text-area'))}}
          onKeyPress={(e) => {
            let key = e.keyCode || e.charCode;
            console.log(key)
            if( key == 127 ){
              console.log("ok")
              this.comment();
            }
          }}
        >
        </textarea><br/>
        <button className="btn btn-primary" onClick={this.comment}>Comment</button>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCommentSend: (comment) => {
      dispatch(sendComment(comment));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(NewComment);
