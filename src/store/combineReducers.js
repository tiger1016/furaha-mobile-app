import {persistCombineReducers} from 'redux-persist';
import authReducer from '../reducers/auth';
import layoutReducer from '../reducers/layout';
import registrationFormReducer from '../reducers/register';
import storage from '../services/storage';

const config = {
  key: 'furaha',
  storage,
  whitelist: ['auth'],
  blacklist: ['registrationForm'],
};
const rootReducer = {
  auth: authReducer,
  layout: layoutReducer,
  registrationForm: registrationFormReducer,
};

export default persistCombineReducers(config, rootReducer);
