import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import Reactotron from '../../reactotronconfig';
import rootReducer from './combineReducers';

const enhancers = [];
if (__DEV__) {
  enhancers.push(Reactotron.createEnhancer());
}

const configureStore = (rootReducer, initialState = {}) => {
  let store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk), ...enhancers),
  );
  let persistor = persistStore(store);

  return {store, persistor};
};

export default configureStore(rootReducer);
