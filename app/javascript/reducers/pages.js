const page = (state, action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      return {
        id: action.id,
        text: action.id,
      };
    default:
      return state;
  }
};

const pages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      return [
        ...state,
        page(undefined, action),
      ];
    case 'DELETE_PAGE':
      return [
        ...state.slice(0, state.map((o) => o.id).indexOf(action.id)),
        ...state.slice(state.map((o) => o.id).indexOf(action.id) + 1),
      ];
    default:
      return state;
  }
};

export default pages;