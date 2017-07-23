import { fromJS } from 'immutable';

const manual = (state = {}, action) => {
  let pages = state.get("pages");
  let pageIndex = pages.findIndex((page) => page.get('id') == action.id);
  let pageByIndex = pages.get(pageIndex);
  switch (action.type) {
    case 'ADD_PAGE':
      return state.set("pages", pages.push(fromJS(action.page)));
    case 'DELETE_PAGE':
      pages = pages.delete(pageIndex);
      return state.set("pages", pages.map((page) => {
        if (page.get("position") > pageByIndex.get("position")) {
         page = page.set("position", page.get("position") -1);
         debugger
        }
        return page;
      }));
    case 'SELECT_CURRENT_PAGE':
      return state.set("current_page", pageIndex);
    default:
      return state;
  }
};

export default manual;