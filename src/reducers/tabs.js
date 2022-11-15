import { GoDashboard } from "react-icons/go";
import { SET_ACTIVE_TAB, RESET_ACTIVE_TAB } from "../actions/tabs";
import Dashboard from "../components/Dashboard/contents/dashboard";

const initialState = {
  activeTab: "dashboard",
  tabs: [
    {
      tabName: "dashboard",
      tabLabel: "Dashboard",
      tabIcon: <GoDashboard size={20} />,
      component: <Dashboard />,
    },
  ],
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
