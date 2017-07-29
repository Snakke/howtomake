if (action.oldPosition == action.newPosition) { return state }
      state = state.set("pages", pages.map((page, index) => {
        if (action.oldPosition > action.newPosition){
          if (index >= action.newPosition && index < action.oldPosition ) {
            page = page.set("position", page.get("position") + 1);
          }
          return page;
        } else{
          if (index <= action.newPosition && index > action.oldPosition ) {
            page = page.set("position", page.get("position") - 1);
          }
          return page;
        }}));
      return state.setIn(["pages", action.oldPosition, "position"], action.newPosition + 1);
     
pages = pages.delete(action.id);
      state = state.set("pages", pages.map((page) => {
        if (page.get("position") > pageByIndex.get("position")) {
         page = page.set("position", page.get("position") -1);
        }
        return page;
      }));
      state = state.set("pages", pages.map((page, index) => {
        if (action.oldPosition > action.newPosition){
          if (index >= action.newPosition && index < action.oldPosition ) {
            page = page.set("position", page.get("position") + 1);
          }
          return page;
        } else{
          if (index <= action.newPosition && index > action.oldPosition ) {
            page = page.set("position", page.get("position") - 1);
          }
          return page;
        }}));
      return state.setIn(["pages", action.oldPosition, "position"], action.newPosition + 1);
      return state.setIn(["pages", pageIndex, "blocks", blockIndex], blockByIndex);
    default:
      return state;