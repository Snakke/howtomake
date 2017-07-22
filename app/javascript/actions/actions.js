let nextPageId = 0;
export const addPage = (page) => {
  console.log("Page " + page.id + " created.")
  return {
    type: 'ADD_PAGE',
    id: page.id,
    title: page.title,
  };
};

export const deletePage = (id) => {
  console.log("Page " + id + " deleted.")
  return {
    type: 'DELETE_PAGE',
    id,
  };
};

export function createPage(manual_id, title) {
  return dispatch => {
    console.log(manual_id) 
    $.ajax({
      url: "/pages",
      type: 'POST',
      dataType:'json',
      data: { page: { title: title, manual_id: manual_id } },
      success: function (resp) {
        dispatch(addPage(resp))
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

