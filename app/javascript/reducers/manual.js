import { fromJS } from 'immutable';
import { getSubscription } from '../cable.js'

const manual = (state = {}, action) => {
  let pages = state.get("pages");
  let pageIndex = pages.findIndex((page) => page.get('id') == action.id);
  switch (action.type) {
    case 'CREATE_PAGE':
      getSubscription({ channel: "ManualsChannel",manual_id: state.get("manual_id")}).perform('add_page', { title: action.title, manual_id: action.manual_id });
      return state;
    case 'ADD_PAGE':
      return state.set("pages", pages.push(fromJS(action.page)));
    case 'REMOVE_PAGE':
      getSubscription({ channel: "ManualsChannel",manual_id: state.get("manual_id")}).perform('delete_page', { id: action.id });
      return state;
    case 'DELETE_PAGE':
      let pageByIndex = pages.get(pageIndex);
      pages = pages.delete(pageIndex);
      return state.set("pages", pages.map((page) => {
        if (page.get("position") > pageByIndex.get("position")) {
         page = page.set("position", page.get("position") -1);
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