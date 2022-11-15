import { SET_ACTIVE_TAB, RESET_ACTIVE_TAB } from "../actions/tabs";

const initialState = {
  activeTab: "dashboard",
};

const tabs = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };

    case RESET_ACTIVE_TAB:
      return initialState;

    default:
      return state;
  }
};

export default tabs;
