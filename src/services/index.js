import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import Config from 'react-native-config';
import r from '../store';
//import RNFetchBlob from 'rn-fetch-blob';
//import perf from '@react-native-firebase/perf';

const {store, persistor} = r;

let instance = axios.create();
let defaultInstance = axios.create();
const baseUrl = Config.API_URL;
instance.defaults.baseURL = baseUrl;
defaultInstance.defaults.baseURL = baseUrl;
instance.interceptors.request.use(async function (config) {
    // const httpMetric = perf().newHttpMetric(config.baseURL + config.url, config.method.toUpperCase());
    // config.metadata = { httpMetric };
    const accessToken = await SInfo.getItem('accessToken', {
        sharedPreferencesName: 'authTokens',
        keychainService: 'authTokens'
    });
    config.headers.common['Authorization'] = `Bearer ${accessToken}`;
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    //config.headers.common['x-app-locale'] = DeviceInfo.lo();
    config.headers.common['accept'] = 'application/json';
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    // const { httpMetric } = response.config.metadata;
    //
    // // add any extra metric attributes if needed
    // // httpMetric.putAttribute('userId', '12345678');
    //
    // httpMetric.setHttpResponseCode(response.status);
    // httpMetric.setResponseContentType(response.headers['content-type']);
    // httpMetric.stop();
    return response.data;
}, function (error) {
    if (error.response) {
        // const { httpMetric } = error.config.metadata;
        //
        // // add any extra metric attributes if needed
        // // httpMetric.putAttribute('userId', '12345678');
        //
        // httpMetric.setHttpResponseCode(error.response.status);
        // httpMetric.setResponseContentType(error.response.headers['content-type']);
        // httpMetric.stop();
        if (error.response.status === 401) {
            SInfo.deleteItem('accessToken', {
                sharedPreferencesName: 'authTokens',
                keychainService: 'authTokens'
            }).then(() => {
                NavigationActions.navigate('Auth', {reason: 'Bad Credentials', reasonCode: 401})
            });
        }
    } else if (error.request) {
    } else {
    }
    return Promise.reject(error);

});
defaultInstance.interceptors.request.use(function (config) {
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    //config.headers.common['x-app-locale'] = DeviceInfo.getDeviceLocale();
    config.headers.common['accept'] = 'application/json';
    return config;
}, function (error) {
    return Promise.reject(error);
});
defaultInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export const plainFetch = (endPoint, payload = {}, method = 'get', headers = {}) => {
    method = method.toLowerCase();
    if (method === "get") {
        return defaultInstance[method](endPoint, {
            params: payload,
            headers: headers
        });
    } else {
        return defaultInstance[method](endPoint, payload, {headers: headers});
    }
};

export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
    method = method.toLowerCase();
    if (method === "get") {
        return instance[method](endPoint, {
            params: payload,
            headers: headers
        });
    } else {
        return instance[method](endPoint, payload, {headers: headers});
    }
};

// export const fetchDataApi = async (endPoint, payload, method = 'get') => {
//     let url = baseUrl + endPoint;
//     const accessToken = await SInfo.getItem('accessToken', {
//         sharedPreferencesName: 'authTokens',
//         keychainService: 'authTokens'
//     });
//     let headers = {
//         Authorization: `Bearer ${accessToken}`,
//         // this is required, otherwise it won't be process as a multipart/form-data request
//         'Content-Type': 'multipart/form-data',
//         'X-Requested-With': 'XMLHttpRequest',

//     };
//     return RNFetchBlob.fetch(method.toLowerCase(), url, headers, payload)
//         .then((response) => {
//             if (response.respInfo.status !== (200 || 201 || 202)) {
//                 return Promise.reject(JSON.parse(response.data))
//             }
//             return JSON.parse(response.data);
//         }).catch((error) => {
//             return Promise.reject(error);
//         });

// };
