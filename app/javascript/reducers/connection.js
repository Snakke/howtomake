const connection = (state = {}, action) => {
  switch (action.type) {
    case 'CONNECTED':
      return state.set("connected", true);
    case 'DISCONNECTED':
      return state.set("connected", false);
    default:
      return state;
  }
};

export default connection;
