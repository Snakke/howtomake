const page = (state, action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      return {
        id: action.id,
        title: action.title,
      };
    default:
      return state;
  }
};

const pages = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      return { manual_id: state.manual_id, pages: [
        ...state.pages,
        page(undefined, action),
      ]};
    case 'DELETE_PAGE':
      let pageIndex = state.pages.map((o) => o.id).indexOf(action.id);
      return { manual_id: state.manual_id, pages: [
        ...state.pages.slice(0, pageIndex), ...state.pages.slice(pageIndex + 1),
      ]};
    default:
      return state;
  }
};

export default pages;