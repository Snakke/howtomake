export function createPage() {
  return{
    type: 'CREATE_PAGE',
  };
};

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

export const createTextBlock = () => {
  return {
    type: 'ADD_TEXT',
  };
};
export const createImageBlock = (image) => {
  return {
    type: 'ADD_IMAGE',
    url: image.url,
    height: image.height,
    width: image.width,
  };
};

export const createVideoBlock = (url) => {
  return {
    type: 'ADD_VIDEO',
    url,
  };
};

export const addBlock = (block) => {
  return {
    type: 'ADD_BLOCK',
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

export const editMode = () => {
  return{
    type: 'EDIT_MODE'
  }
}

export const updateTitle = (title) => {
  return{
    type: 'UPDATE_TITLE',
    title,
  }
}