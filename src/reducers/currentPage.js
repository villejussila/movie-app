const currentPageReducer = (state = 1, action) => {
  switch (action.type) {
    case "CURRENT_PAGE": {
      return state;
    }
    case "NEXT_PAGE": {
      return state < action.payload ? state + 1 : state;
    }
    case "PREVIOUS_PAGE": {
      return state - 1 || 1;
    }
    case "RESET_TO_FIRST_PAGE":
      return (state = 1);
    default:
      return state;
  }
};

export default currentPageReducer;
