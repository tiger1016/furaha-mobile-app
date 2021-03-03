import {persistCombineReducers} from 'redux-persist';
import authReducer from '../reducers/auth';
import layoutReducer from '../reducers/layout';
import storage from '../services/storage';

const config = {
  key: 'furaha',
  storage,
};
const rootReducer = {
  auth: authReducer,
  layout: layoutReducer,
};

export default persistCombineReducers(config, rootReducer);
