import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import resultListReducer from "./components/result/reducer";
import rootSaga from "./rootSaga";


const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    combineReducers({resultListReducer}),
    compose(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store;