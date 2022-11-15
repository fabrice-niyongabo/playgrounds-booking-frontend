import { combineReducers } from "redux";
import user from "./user";
import tabs from "./tabs";
import fullPageLoader from "./fullPageLoader";

const rootReducer = combineReducers({
  user,
  tabs,
  fullPageLoader,
});

export default rootReducer;
