/**
 * Created by aitspeko on 12/03/2018.
 */

import branch from 'react-native-branch';
import r from "../../store";
import RNGooglePlaces from "react-native-google-places";
import Share from "react-native-share";
import Config from "react-native-config";
import Unsplash, {toJson} from "unsplash-js/native";
import actions from "../../store/actions";
import moment from "moment";
import translate from "../../screens/i18n/i18n";
import PushNotification from "react-native-push-notification";
//import {Freshchat, FreshchatConfig, FreshchatUser} from "react-native-freshchat-sdk";
import {Linking} from 'react-native';
import {request, requestMultiple} from "react-native-permissions";
import {DrawerActions} from "react-navigation-drawer";
import {navigate, navigatorDispatchFree} from "../../services/navigation";
import Intercom from 'react-native-intercom';
import {encode} from 'js-base64';
import Geolocation from '@react-native-community/geolocation';

const {store, persistor} = r;

const actionsCreator = {

    authLogin: (payload) => {
        return {
            type: actions.LOGIN,
            payload: payload,
        };
    },
    addPermission: (payload) => {
        return {
            type: actions.ADD_PERMISSION,
            payload: payload,
        };
    },
    askPermission: (payload) => {
        return {
            type: actions.REQUEST_PERMISSION,
            payload: payload,
        };
    },
    authLogged: (payload) => {
        return {
            type: actions.LOGGED_IN,
            payload: payload,
        };
    },
    authRegister: (payload) => {
        return {
            type: actions.REGISTER,
            payload: payload,
        };
    },
    onBoard: (payload) => {
        return {
            type: actions.ONBOARD,
            payload: payload
        }
    },
    dismissOnboard: (payload) => {
        return {
            type: actions.DISMISS_ONBOARD,
            payload: payload
        }
    },
    editMarketing: (payload) => {
        return {
            type: actions.EDIT_MARKETING,
            payload: payload
        }
    },
    initSupport: (payload) => {
        return {
            type: actions.INITIALISE_SUPPORT,
            payload: payload
        }
    }
};
const dispatchAction = function (action, payload) {
    return store.dispatch(actionsCreator[action](payload));
};
const sendLocalNotication = function (title, message, sound = false, id = null, params = {}) {
    let notificationParams = {
        title: title, // (optional)
        message: message, // (required)
        playSound: sound,
        userInfo: {id: id},
        ...params
    };
    PushNotification.localNotification(notificationParams);
};
const getPushNotification = function () {
    return PushNotification;
};
const createShortLink = async function (link, title?, description?, uid?) {

    let branchUniversal = await branch.createBranchUniversalObject('canonicalIdentifier', {
            title: title,
            locallyIndex: true,
            contentDescription: description
        }),
        contentMetadata: {
            customMetadata: {
                uniqueId: uid, // your userId field would be defined under customMetadata
            }
        };

    const {url} = await branchUniversal.generateShortUrl({
        feature: 'share', channel: 'mobileApp'
    }, {
        $fallback_url: link
    });
    return url;
};
const shareItem = async function (url, message, title, subject = null, createUrl = true) {
    let dUrl = url;
    if (createUrl === true) {
        dUrl = await createShortLink(url);
    } else {
        dUrl = url;
    }
    return Share.open({
        type: 'url',
        url: dUrl,
        message: message,
        title: title,
        subject: subject ? subject : translate('share')
    });
};

/**
 * Request any permission from the system
 * @param type
 * @returns {Promise<"denied" | "blocked" | "unavailable" | "granted">}
 */
const requestPermission = (type) => {
    return request(type).then(res => {
        dispatchAction('addPermission', {
            permission: type,
            result: res
        })
        return res;
    });
};

const requestMultiplePermissions = (types) => {
    return requestMultiple(types).then(res => {
        types.forEach(type => {
            dispatchAction('addPermission', {
                permission: type,
                result: res[type]
            })
        })

        return res;
    });
};


const unsplash = new Unsplash({
    applicationId: Config.UNSPLASH_APP_ID,
    secret: Config.UNSPLASH_APP_SECRET,
    callbackUrl: Config.UNSPLASH_CALLBACK
});

const getRandomPhoto = function (options = {}) {
    return unsplash.photos.getRandomPhoto(options)
        .then(toJson)
        .then(json => {
            return json;
        });
};
const getUnsplashImage = function () {
    return storage.load({key: 'curatedPhotosSpots'})
        .then((res) => {
            return res[Math.floor(Math.random() * res.length)];
        })
        .catch((err) => {
            return getCollection(2259351).then(res => {
                storage.save({
                    key: 'curatedPhotosSpots',
                    data: res,
                    expires: 3000 * 60
                });
                return res[Math.floor(Math.random() * res.length)];
            });
        });
};
const initSupport = function (user) {
    // const freshchatConfig = new FreshchatConfig(Config.FRESHCHAT_APP_ID, Config.FRESHCHAT_APP_KEY);
    // //TODO:: Gain Consent
    // Freshchat.init(freshchatConfig);
    // let freshchatUser = new FreshchatUser();
    // freshchatUser.firstName = user.first_name;
    // freshchatUser.lastName = user.last_name;
    // freshchatUser.email = user.email;
    // Freshchat.setUser(freshchatUser, (error) => {
    // });

    Intercom.registerIdentifiedUser({userId: encode(user.id), email: user.email});
    updateSupportUser(user);

    return dispatchAction('initSupport', {user_id: user.email});
};

const updateSupportUser = function (user) {
    Intercom.updateUser({
        // Pre-defined user attributes
        email: user.email,
        user_id: encode(user.id),
        name: user.full_name
    });
}
const getCollection = function (collection) {
    return unsplash.collections.getCollectionPhotos(collection)
        .then(toJson)
        .then(json => {
            return json;
        });
};

const onboard = function (payload) {
    return dispatchAction('onBoard', payload)
};
const cancelOnboard = function (payload) {
    return dispatchAction('dismissOnboard', payload)
};
const editMarketingOptions = function (payload) {
    return dispatchAction('editMarketing', payload)
};
const getGreetingTime = function (m) {
    let g = null; //return g

    if (!m) {
        m = moment();
    }

    let split_afternoon = 12; //24hr time to split the afternoon
    let split_evening = 17; //24hr time to split the evening
    let currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
        g = translate('afternoon');
    } else if (currentHour >= split_evening) {
        g = translate('evening');
    } else {
        g = translate('morning');
    }

    return g;
};

const _keyExtractor = (item, index) => {
    return item.id + index
};

/**
 *
 */
const requestCurrentLocation = function () {
    return RNGooglePlaces.getCurrentPlace().then(res => {
        return res;
    }).catch(e => {

    });
};
const showSupport = function () {
    //Freshchat.showConversations();
    Intercom.displayMessenger();
};
const openUrl = function (url, supportsLink = false) {
    if (supportsLink) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    } else {
        Linking.openURL(url);
    }
};
const showMainDrawer = function () {
    navigatorDispatchFree(DrawerActions.toggleDrawer());
};
const openWebViewer = function (url) {
    navigate('WebView', {url: url})
}
export {
    createShortLink,
    shareItem,
    unsplash,
    getRandomPhoto,
    getUnsplashImage,
    getPushNotification,
    onboard,
    cancelOnboard,
    requestPermission,
    requestMultiplePermissions,
    editMarketingOptions,
    getCollection,
    sendLocalNotication,
    getGreetingTime,
    requestCurrentLocation,
    initSupport,
    updateSupportUser,
    showSupport,
    openUrl,
    _keyExtractor,
    showMainDrawer,
    openWebViewer,
    actionsCreator
};

export default actionsCreator;
