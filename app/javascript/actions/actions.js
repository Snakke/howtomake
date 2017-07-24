export function createPage(manual_id, title) {
  return{
    type: 'CREATE_PAGE',
    manual_id,
    title,
  }
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
  }
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

export function createBlock(page_id, type) {
  return dispatch => {
    $.ajax({
      url: "/blocks",
      type: 'POST',
      dataType:'json',
      data: { block: { page_id: page_id, type: type, data: { x: 5, y: 5, content: "" } } },
      success: function (data) {
        dispatch(addBlock(data))
      }
    })
  };
};

