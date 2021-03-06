import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Comment from './comment.js';
import NewComment from './new_comment.js';

class Comments extends React.Component {
  render(){
    return (
      <div className="comments-bar">
        <div className="comments" >
          {this.props.comments.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
            />
          ))}
        </div>
        <NewComment />
      </div>
    );
  }
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    page_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default Comments;
