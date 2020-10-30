export const initialState = {
  term: null,
};

export const actionTypes = {
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
};

const reducer = (state, action) => {
  console.log("Action logged: ", action);
  switch (action.type) {
    case "SET_SEARCH_TYPE":
      return {
        ...state,
        term: action.term,
      };

    default:
      return state;
  }
};

export default reducer;
