import ActionTypes from '../store/actions';
import objectAssign from 'object-assign';

const initialState = {
  waiting: true,
  state: null,
  tokenSet: false,
  user: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.LOGIN:
      return objectAssign({}, state, {
        waiting: true,
      });
    case ActionTypes.LOGGED_IN:
      return objectAssign({}, state, {
        state: payload.state,
        user: payload.user,
        waiting: false,
        tokenSet: true,
      });
    case ActionTypes.LOGOUT:
      return objectAssign({}, state, {
        user: {},
        tokenSet: false,
        waiting: true,
      });
    default:
      return state;
  }
};
