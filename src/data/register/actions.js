import r from '../../store';
import SInfo from 'react-native-sensitive-info';
import ActionTypes from '../../store/actions';

const {store, persistor} = r;
const actionsCreator = {
  changeRegistrationForm: (payload) => {
    return {
      type: ActionTypes.REGISTRATIONFORM,
      payload: payload,
    };
  },
};
const dispatchAction = function (action, payload) {
  return store.dispatch(actionsCreator[action](payload));
};

const register = function (payload) {
  return api
    .register(payload)
    .then((responseJson) => {
      // analytics().logSignUp({method: 'Email'});
      payload = {
        user: responseJson.results.data,
      };
      return dispatchAction('authRegister', payload);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const changeRegistrationForm = (data) => {
  dispatchAction('changeRegistrationForm', data);
};

export {register, changeRegistrationForm};

export default actionsCreator;
