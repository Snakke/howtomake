import { fromJS } from 'immutable';

const manual = (state = {}, action) => {
  let pages = state.get("pages");
  switch (action.type) {
    case 'ADD_PAGE':
      return state.set("pages", pages.push(action.page));
    case 'DELETE_PAGE':
      let pageIndex = pages.findIndex((page) => page.id == action.id);
      let pageToDelete = pages.get(pageIndex);
      pages = pages.delete(pageIndex);
      return state.set("pages", pages.map((page) => {
        if (page.position > pageToDelete.position) {
          page.position = page.position - 1
        }
        return page;
      }));
    default:
      return state;
  }
};

export default manual;