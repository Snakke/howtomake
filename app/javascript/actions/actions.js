let nextPageId = 0;
export const addPage = (page) => {
  return {
    type: 'ADD_PAGE',
    page
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

export function createPage(manual_id, title) {
  return dispatch => {
    $.ajax({
      url: "/pages",
      type: 'POST',
      dataType:'json',
      data: { page: { title: title, manual_id: manual_id } },
      success: function (data) {
        dispatch(addPage(data))
      }
    })
  };
};

export function removePage(id) {
  return dispatch => { 
    $.ajax({
      url: "/pages/"+id,
      type: 'DELETE',
      dataType:'json',
      data: { id: id },
      success: function () {
        dispatch(deletePage(id))
      }
    })
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

