import {persistCombineReducers} from 'redux-persist';
import authReducer from '../reducers/auth';
import storage from '../services/storage';

const config = {
  key: 'furaha',
  storage,
};
const rootReducer = {
  auth: authReducer,
};

export default persistCombineReducers(config, rootReducer);
