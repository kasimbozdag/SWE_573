import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import xmlRequestService from "./services";
import authReducer from "./reducers/auth";
import globalReducer from "./reducers/global";

const reducers = combineReducers({
  auth: authReducer,
  global: globalReducer
});

const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument(xmlRequestService))
);

export default store;
export const API_URL = "http://127.0.0.1:8000";
