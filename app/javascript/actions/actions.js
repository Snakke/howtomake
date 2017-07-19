let nextPageId = 0;
export const addPage = () => {
  return {
    type: 'ADD_PAGE',
    id: (nextPageId++).toString(),
  };
};