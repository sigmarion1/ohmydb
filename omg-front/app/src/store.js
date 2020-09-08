import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import modules from './modules'

const logger = createLogger()

const sagaMiddleware = createSagaMiddleware()

const store = createStore(modules, applyMiddleware(logger, sagaMiddleware))

export default store;

