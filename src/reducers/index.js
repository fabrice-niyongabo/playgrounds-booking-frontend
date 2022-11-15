import { combineReducers } from "redux";
import user from "./user";
import tabs from "./tabs";

const rootReducer = combineReducers({
  user,
  tabs,
});

export default rootReducer;
