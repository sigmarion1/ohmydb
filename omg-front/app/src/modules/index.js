
import loggedReducer from "./isLogged";
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import sample, { sampleSaga } from "./sample";
import loading from "./loading";
import isSideDrawerOpened from "./isSideDrawerOpened";

const rootReducer = combineReducers({
  isLogged: loggedReducer,
  sample,
  loading,
  isSideDrawerOpened,
});

export function* rootSaga() {
  yield all([sampleSaga()]);
}

export default rootReducer;
