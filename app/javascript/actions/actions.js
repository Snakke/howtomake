export function createPage(manual_id) {
  return{
    type: 'CREATE_PAGE',
    manual_id,
  };
};

//need?
export const addPage = (page) => {
  return {
    type: 'ADD_PAGE',
    page,
  };
};

export function removePage(id) {
  return{
    type: 'REMOVE_PAGE',
    id,
  };
};

//need?
export const deletePage = (id) => {
  return {
    type: 'DELETE_PAGE',
    id,
  };
};

export const selectCurrentPage = (id) => {
  return {
    type: 'SELECT_CURRENT_PAGE',
    id,
  };
};

export const createTextBlock = (position) => {
  return {
    type: 'ADD_TEXT',
    position,
  };
};
export const createImageBlock = (position, image) => {
  return {
    type: 'ADD_IMAGE',
    position,
    url: image.url,
    height: image.height,
    width: image.width,
  };
};

export const createVideoBlock = (position, url) => {
  return {
    type: 'ADD_VIDEO',
    position,
    url,
  };
};

export const addBlock = (position, block) => {
  return {
    type: 'ADD_BLOCK',
    position,
    block,
  }
}

export const moveBlock = (id, x, y) => {
  return{
    type: 'MOVE_BLOCK',
    id,
    x,
    y,
  }
}

export const resizeBlock = (id, direction, w, h) => {
  return{
    type: 'RESIZE_BLOCK',
    id,
    direction,
    w,
    h,
  }
}

export const sortPages = (id, oldPosition, newPosition) => {
  return{
    type: 'SORT_PAGES',
    id,
    oldPosition,
    newPosition,
  }
}

export const updatePages = (new_order) => {
  return{
    type: 'UPDATE_PAGES',
    new_order,
  }
}

export const updateText = (id, content) => {
  return{
    type: 'UPDATE_TEXT',
    id,
    content,
  }
}