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

