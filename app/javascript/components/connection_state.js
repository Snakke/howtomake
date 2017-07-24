import React from 'react';
import PropTypes from 'prop-types';
import Block from './block.js';
import { connect } from 'react-redux';
import { createSubscription } from '../cable'
import { addPage } from '../actions/actions.js';

class ConnectionState extends React.Component{
  componentWillMount() {
    let _dispatch = this.props.dispatch;
    createSubscription({channel: "ManualsChannel", manual_id: this.props.manualId},
      {
        connected: function() {
          _dispatch({type: "CONNECTED"})
        },
        disconnected: function() {
          _dispatch({type: "DISCONNECTED"})
        },
        received: function(data) {
          _dispatch(data);
        }
      }
    );
  }

  render(){
    return (
      <div className="overlay" style={{display: this.props.connected ? 'none' : 'block'}}>
        <div className="message">Disconnected from server.</div>
      </div>    
    )
  }
}

ConnectionState.propTypes;

const mapStateToProps = (state) => {
  return {
    manualId: state.getIn(["manual", "manual_id"]),
    connected: state.getIn(["connection", "connected"])
  };
};

export default connect(mapStateToProps, undefined)(ConnectionState);