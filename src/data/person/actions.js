import * as api from "./api";
import r from "../../store";
import actions from "../../store/actions";
import DeviceInfo from "react-native-device-info";
import {Platform} from "react-native";

export const get = payload =>
    dispatch =>
        api.get(payload);

const {store, persistor} = r;
const actionsCreator = {

    update: (payload) => {
        return {
            type: actions.PERSON_UPDATE,
            payload: payload,
        };
    },
};
const dispatchAction = function (action, payload) {
    return store.dispatch(actionsCreator[action](payload));
};
const updateAccount = function (payload) {
    return api.addAccount(payload).then((response) => {
        return dispatchAction('update', {user: response.results.data});
    }).catch((error) => {
        return Promise.reject(error);
    });
};
const updatePhoto = function (payload) {
    let data = [];
    data.push({
        name: "avatar",
        filename: payload.filename,
        data: payload.data
    });
    return api.updateWithFile(data, {
        'Content-Type': 'multipart/form-data'
    })
        .then((response) => {
            return dispatchAction('update', {user: response.results.data});
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};
const update = function (payload) {
    return api.update(payload)
        .then((response) => {
            return dispatchAction('update', {user: response.results.data});
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

const registerDevice = function (devicePayload) {
    const deviceInfo = Promise.resolve(Promise.all([DeviceInfo.getSystemName(), DeviceInfo.getDeviceName(), DeviceInfo.getUniqueId(), DeviceInfo.getManufacturer(), DeviceInfo.getModel()]));
    if(devicePayload.pushToken) {
        deviceInfo.then(val => {
            let payload = {
                title: val[0],
                description: val[1],
                platform: Platform.OS,
                uuid: val[2],
                make: val[3],
                model: val[4],
                device_code: devicePayload.userId,
                token: devicePayload.pushToken
            };
            return api.addDevice(payload);
        });
    }
};

export {
    update,
    updateAccount,
    updatePhoto,
    registerDevice,
    actionsCreator
};

export default actionsCreator;
