const initialState = {
  init: false,
};

const initHomePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_HOME_PAGE":
      return { init: action.payload };
    default: {
      return state;
    }
  }
};
export default initHomePageReducer;
