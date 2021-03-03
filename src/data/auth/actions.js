import * as api from './api';
import * as userApi from '../person/api';
import * as sharedApi from '../shared/api';
import * as sharedActions from '../../data/shared/actions';
import r from '../../store';
import analytics from '@react-native-firebase/analytics';
import SInfo from 'react-native-sensitive-info';
import ActionTypes from '../../store/actions';
import branch from 'react-native-branch';
import Intercom from 'react-native-intercom';

const {store, persistor} = r;
const actionsCreator = {
  authLogin: (payload) => {
    return {
      type: ActionTypes.LOGIN,
      payload: payload,
    };
  },
  authLogged: (payload) => {
    return {
      type: ActionTypes.LOGGED_IN,
      payload: payload,
    };
  },
  personUpdate: (payload) => {
    return {
      type: ActionTypes.PERSON_UPDATE,
      payload: payload,
    };
  },
  authRegister: (payload) => {
    return {
      type: ActionTypes.REGISTER,
      payload: payload,
    };
  },
  authLogout: (payload) => {
    return {
      type: ActionTypes.LOGOUT,
      payload: payload,
    };
  },
};
const dispatchAction = function (action, payload) {
  return store.dispatch(actionsCreator[action](payload));
};
const login = function (payload) {
  return api
    .login(payload)
    .then((responseJson) => {
      storeToken(responseJson);
      analytics().logLogin({method: 'Email'});
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const logout = function (payload) {
  return api.logout(payload).then(() => {
    branch.logout();
    Intercom.logout();
    return dispatchAction('authLogout', {tokenSet: false});
  });
};

const storeToken = function (responseJson) {
  SInfo.setItem('accessToken', responseJson.access_token, {
    sharedPreferencesName: 'authTokens',
    keychainService: 'authTokens',
  });
};
const getToken = function () {
  SInfo.getItem('accessToken', {
    sharedPreferencesName: 'authTokens',
    keychainService: 'authTokens',
  });
};

const socialLogin = function (payload) {
  return api
    .socialLogin(payload)
    .then((response) => {
      storeToken(response);
      analytics().logLogin({method: payload.provider});
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const getLoggedInUser = function () {
  return userApi
    .get()
    .then((responseJson) => {
      const user = responseJson.results.data;
      branch.setIdentity(user.id);
      sharedActions.initSupport(user);
      sharedActions.updateSupportUser(user);
      dispatchAction('authLogged', {
        user: user,
      });
      return dispatchAction('personUpdate', {
        user: user,
      });
    })
    .catch((error) => {
      // dispatchAction('authLogout', {tokenSet: false});
      // NavigationActions.navigate('AuthChecker');
      // Toast.show({
      //     text: translate('signed_out_successful'),
      //     buttonText: translate('okay')
      // });
      return Promise.reject(error);
    });
};
const register = function (payload) {
  return api
    .register(payload)
    .then((responseJson) => {
      analytics().logSignUp({method: 'Email'});
      payload = {
        user: responseJson.results.data,
      };
      return dispatchAction('authRegister', payload);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
const checkUsername = function (payload) {
  return sharedApi.checkUsername(payload).then((response) => {
    return response.results;
  });
};
export {
  login,
  logout,
  register,
  getLoggedInUser,
  getToken,
  socialLogin,
  checkUsername,
  actionsCreator,
};

export default actionsCreator;
