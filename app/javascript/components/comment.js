import React from 'react';
import PropTypes from 'prop-types';

class Comment extends React.Component {
  render(){
    return (
      <div className="comment">
        <div className="title h5">
          <a href={"/users/"+this.props.user_id}><b>{this.props.user.name} </b></a>made a post.
        </div>
        <h6 className="text-muted time">{this.props.date_format}</h6>
        <div className="description"> 
          <p>{this.props.comment}</p>
        </div>
      </div>
    );
  }
};

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  page_id: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
};

export default Comment;
