import { fromJS } from 'immutable';
import { getSubscription } from '../cable.js'

const manual = (state = {}, action) => {
  let pages = state.get("pages");
  let pageIndex = null;
  let page_id = null;
  let currentSubscription = getSubscription({ channel: "ManualsChannel",manual_id: state.get("manual_id")})
  switch (action.type) {
    case 'CREATE_PAGE':
      currentSubscription.perform('add_page', {
        title: "New page",
        manual_id: action.manual_id
      });
      return state;
    case 'ADD_PAGE':
      return state.set("pages", pages.push(fromJS(action.page)));
    case 'REMOVE_PAGE':
      currentSubscription.perform('delete_page', {
        id: action.id
      });
      return state;
    case 'DELETE_PAGE':
      pageIndex = pageIndex = pages.findIndex((page) => page.get('id') == action.id);
      let pageByIndex = pages.get(pageIndex);
      pages = pages.delete(pageIndex);
      return state.set("pages", pages.map((page) => {
        if (page.get("position") > pageByIndex.get("position")) {
         page = page.set("position", page.get("position") -1);
        }
        return page;
      }));
    case 'SELECT_CURRENT_PAGE':
      pageIndex = pageIndex = pages.findIndex((page) => page.get('id') == action.id);
      return state.set("current_page", pageIndex);
    case 'ADD_TEXT':
      page_id = pages.getIn([action.position, "id"]);
      currentSubscription.perform('add_text', {
        page_id: page_id,
        type: "Text",
        data: {x: 50, y: 50, height: 50, width: 200, content: "text", type: "Block"}
      });
      return state;
    case 'ADD_IMAGE':
      let height = 800
      page_id = pages.getIn([action.position, "id"]);
      currentSubscription.perform('add_image', {
        page_id: page_id,
        type: "Image",
        data: {x: 50, y: 50, height: height, width: action.height*height/action.width , content: action.url, type: "ImageBlock"}
      });
      return state;
    case 'ADD_VIDEO':
      page_id = pages.getIn([action.position, "id"]);
      currentSubscription.perform('add_video', {
        page_id: page_id,
        type: "Video",
        data: {x: 50, y: 50, height: 270, width: 480 , content: action.url, type: "VideoBlock"}
      });
      return state;
    case 'ADD_BLOCK':
      let page = pages.get(action.position);
      let blocks = page.get("blocks");
      blocks = blocks.push(fromJS(action.block));
      page = page.set("blocks", blocks);
      pages = pages.set(action.position, page);
      return state.set("pages", pages);
    case 'MOVE_BLOCK':
      currentSubscription.perform('move_block', {
        id: action.id,
        x: action.x,
        y: action.y,
      });
      return state
    default:
      return state;
  }
};

export default manual;
