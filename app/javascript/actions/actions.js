let nextPageId = 0;
export const addPage = () => {
  console.log("Page " + nextPageId + " created.")
  return {
    type: 'ADD_PAGE',
    id: (nextPageId++),
  };
};

export const deletePage = (id) => {
  console.log("Page " + id + " deleted.")
  return {
    type: 'DELETE_PAGE',
    id,
  };
};
