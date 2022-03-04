import { combineReducers } from "redux";
//core
import userReducer from "./userReducer";
import loansReducer from "./loansReducer";
const rootReducer = combineReducers({
  //account: accountReducer
  user: userReducer,
  loans: loansReducer,
});

export default rootReducer;
