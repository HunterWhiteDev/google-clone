export const initialState = {
  term: null,
};

export const actionTypes = {
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_SEARCH_TYPE: "SET_SEARCH_TYPE",
};

const reducer = (state: any, action: any) => {
  console.log(state, action);
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        term: action.term,
      };
    case "SET_SEARCH_TYPE":
      console.log("test");
      return {
        ...state,
        searchType: action.searchType,
      };

    default:
      return state;
  }
};

export default reducer;
