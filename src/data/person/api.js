import {fetchApi, fetchDataApi} from '../../services/';

const endPoints = {
    me: `/users/me`,
    root: `/users`,
    shaper: `/users/shaper`,
    billing: '/billing',
    devices: '/users/devices'
};

export const get = payload => fetchApi(endPoints.me, payload, 'get');
export const getOne = payload => fetchApi(endPoints.root + `/${payload.id}`, payload, 'get');
export const update = (payload, headers) => fetchApi(endPoints.me, payload, 'post', headers);
export const updateWithFile = (payload, headers) => fetchDataApi(endPoints.me, payload, 'post', headers);

export const addAccount = payload => {
    return fetchApi(endPoints.billing, payload, 'post');
};
export const addDevice = payload => {
    return fetchApi(endPoints.devices, payload, 'post');
};
export const verifyShaper = payload => fetchApi(endPoints.shaper + `/verify`, payload, 'post');
export const getShaper = payload => fetchApi(endPoints.shaper, payload, 'get');
export const addAccounts = payload => fetchApi(endPoints.shaper + `/accounts`, payload, 'post');
export const viewAccounts = payload => fetchApi(endPoints.shaper + `/accounts`, payload, 'get');
export const deleteAccount = payload => fetchApi(endPoints.shaper + `/accounts/` + `${payload.id}`, payload, 'delete');
