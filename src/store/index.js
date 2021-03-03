import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import {createMemoryHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';
import Reactotron from '../../reactotronconfig';
import rootReducer from './combineReducers';

const enhancers = [];
if (__DEV__) {
  enhancers.push(Reactotron.createEnhancer());
}

export const config = {
  history: null,
};

export function setHistory() {
  config.history = createMemoryHistory();
}

const configureStore = (rootReducer, initialState = {}) => {
  const middlewares = [thunk, routerMiddleware(config.history)];
  let store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers),
  );
  let persistor = persistStore(store);

  return {store, persistor};
};

export default configureStore(rootReducer);
