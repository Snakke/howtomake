import { fromJS } from 'immutable';
import { getSubscription } from '../cable.js'

const manual = (state = {}, action) => {
  let manual_id = state.get("manual_id");
  let pages = state.get("pages");
  let current_page = state.get("current_page");
  let pageIndex = null;
  let page_id = null;
  let page = null;
  let blockIndex = null;
  let blockByIndex = null;
  let currentSubscription = getSubscription({ channel: "ManualsChannel",manual_id: state.get("manual_id")})
  switch (action.type) {
    case 'CREATE_PAGE':
      currentSubscription.perform('add_page', {
        title: "New page",
        manual_id
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
      pageIndex = pages.findIndex((page) => page.get('id') == action.id);
      if (pageIndex < 0) { return state }
        
      let pageByIndex = pages.get(pageIndex);
      pages = pages.delete(pageIndex);
      state = state.set("current_page", pageIndex > 0 ? pageIndex-1 : 0)
      return state.set("pages", pages.map((page) => {
        if (page.get("position") > pageByIndex.get("position")) {
         page = page.set("position", page.get("position") -1);
        }
        return page;
      }));
    case 'SELECT_CURRENT_PAGE':
      pageIndex = pages.findIndex((page) => page.get('id') == action.id);
      return state.set("current_page", pageIndex);
    case 'ADD_TEXT':
      page_id = pages.getIn([current_page, "id"]);
      currentSubscription.perform('add_text', {
        page_id: page_id,
        type: "Text",
        data: {x: 50, y: 50, height: 50, width: 200, content: "text", type: "Block"}
      });
      return state;
    case 'ADD_IMAGE':
      let width = 300
      page_id = pages.getIn([current_page, "id"]);
      currentSubscription.perform('add_image', {
        page_id: page_id,
        type: "Image",
        data: {x: 50, y: 50, height: action.height*width/action.width, width: width , content: action.url, type: "ImageBlock"}
      });
      return state;
    case 'ADD_VIDEO':
      page_id = pages.getIn([current_page, "id"]);
      currentSubscription.perform('add_video', {
        page_id: page_id,
        type: "Video",
        data: {x: 50, y: 50, height: 270, width: 480 , content: action.url, type: "VideoBlock"}
      });
      return state;
    case 'ADD_BLOCK':
      page = pages.get(current_page);
      let blocks = page.get("blocks");
      blocks = blocks.push(fromJS(action.block));
      page = page.set("blocks", blocks);
      pages = pages.set(current_page, page);
      return state.set("pages", pages);
    case 'MOVE_BLOCK':
      page = pages.get(current_page);
      blockIndex = page.get("blocks").findIndex((block) => block.get('id') == action.id);
      if (blockIndex < 0) { return state }

      blockByIndex = page.getIn(["blocks", blockIndex]);
      blockByIndex = blockByIndex.updateIn(["data", "x"], x => action.x);
      blockByIndex = blockByIndex.updateIn(["data", "y"], y => action.y);
      currentSubscription.perform('move_block', {
        id: action.id,
        data: blockByIndex.get("data"),
      });
      return state.setIn(["pages", current_page, "blocks", blockIndex], blockByIndex);
    case 'RESIZE_BLOCK':
      page = pages.get(current_page);
      blockIndex = page.get("blocks").findIndex((block) => block.get('id') == action.id);
      if (blockIndex < 0) { return state }

      blockByIndex = page.getIn(["blocks", blockIndex]);
      blockByIndex = blockByIndex.updateIn(["data", "width"], width => width + action.w);
      blockByIndex = blockByIndex.updateIn(["data", "height"], height => height + action.h);
      switch(action.direction){
        case 'topLeft':
          blockByIndex = blockByIndex.updateIn(["data", "x"], x => x - action.w);
          blockByIndex = blockByIndex.updateIn(["data", "y"], y => y - action.h);
          break;;
        case 'top':
        case 'topRight':
          blockByIndex = blockByIndex.updateIn(["data", "y"], y => y - action.h);
          break;
        case 'left':
        case 'bottomLeft':
          blockByIndex = blockByIndex.updateIn(["data", "x"], x => x - action.w);
          break;
        default: break;
      }

      currentSubscription.perform('resize_block', {
        id: action.id,
        data: blockByIndex.get("data"),
      });
      return state.setIn(["pages", current_page, "blocks", blockIndex], blockByIndex);
    case 'SORT_PAGES':
      if ( action.oldPosition == action.newPosition ) { return state }
      currentSubscription.perform('sort_pages', {
        id: action.id,
        newPosition: action.newPosition,
      });
      return state;
    case 'UPDATE_PAGES':
      pages = pages.map(page => {
        page = page.set('position', ( action.newOrder.indexOf(page.get('id'))+1))
        return page;
      });
      pages = pages.sortBy(page => page.get('position'));
      return state.set("pages", pages);
    case 'UPDATE_TEXT':
      page = pages.get(current_page);
      blockIndex = page.get("blocks").findIndex((block) => block.get('id') == action.id);
      if (blockIndex < 0) { return state }

      blockByIndex = page.getIn(["blocks", blockIndex]);
      blockByIndex = blockByIndex.updateIn(["data", "content"], content => action.content);
      currentSubscription.perform('update_text', {
        id: action.id,
        data: blockByIndex.get("data"),
      });
      return state.setIn(["pages", current_page, "blocks", blockIndex], blockByIndex);
    case 'EDIT_MODE':
      return state.set("edit_mode", !state.get("edit_mode"));
    case 'UPDATE_TITLE':
      let pageId = pages.getIn([current_page, "id"]);
      currentSubscription.perform('update_title', {
        id: pageId,
        title: action.title,
      });
      return state.setIn(["pages", current_page, "title"], action.title);
    default:
      return state;
  }
};

export default manual;
