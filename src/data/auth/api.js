import Config from 'react-native-config';
import {fetchApi, plainFetch} from '../../services';

const endPoints = {
  oauth: Config.API_URL + '/oauth',
  auth: Config.API_URL + `/auth`,
};

export const socialLogin = (payload) =>
  plainFetch(
    endPoints.auth + '/social-login',
    {
      ...payload,
      client: Config.API_CLIENT_ID,
    },
    'post',
  );
export const login = (payload) =>
  plainFetch(
    endPoints.auth + '/login',
    {
      ...payload,
      client_id: Config.API_CLIENT_ID,
    },
    'post',
  );
export const register = (payload) =>
  plainFetch(endPoints.auth + '/register', payload, 'post');
export const logout = (payload) => fetchApi(`users/logout`, payload, 'post');
