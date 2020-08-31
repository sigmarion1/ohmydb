// import { combineReducers } from 'redux';
// import counter, { counterSaga } from './counter-saga';
// import post from './post';
// import { all } from 'redux-saga/effects';

// export function* rootSaga() {
//   yield all([counterSaga()]);
// }

// export default combineReducers({
//   counter,
//   post
// });

import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import sample, { sampleSaga } from "./sample";
import loading from "./loading";
import isOpened from "./isOpened";

const rootReducer = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  sample,
  loading,
  isOpened,
});

export function* rootSaga() {
  yield all([sampleSaga()]);
}

export default rootReducer;
