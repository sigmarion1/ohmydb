import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

import { createStore, applyMiddleware, } from 'redux'
import rootReducer, { rootSaga } from './modules'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';

// //action
// const increment = () => {
//   return {
//     type: 'INCREMENT'
//   }
// }
// const decrement = () => {
//   return {
//     type: 'DECREMENT'
//   }
// }

// //reducer
// const counter = (state=0, action) => {
//   switch(action.type){
//     case "INCREMENT":
//       return state + 1
//     case "DECREMENT":
//       return state - 1
//   }
// }

// //store
// let store = createStore(counter)
// store.subscribe(() => console.log(store.getState()))

// //dispatch
// store.dispatch(increment())
// store.dispatch(decrement())

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, sagaMiddleware)),
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store ={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
,
  document.getElementById('root')
);
