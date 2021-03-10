import Config from 'react-native-config';
import {plainFetch} from "../../services/index";

const endPoints = {
    services: Config.API_URL + '/service'
};
export const checkUsername = payload => plainFetch(endPoints.services + '/check-ident', payload, 'post');