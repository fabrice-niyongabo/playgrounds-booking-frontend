import { SET_SHOW_FULL_PAGE_LOADER } from "../actions/fullPageLoader";
const initialState = {
  showLoader: false,
};

const fullPageLoader = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_FULL_PAGE_LOADER:
      return { ...state, showLoader: action.payload };
    default:
      return state;
  }
};

export default fullPageLoader;
