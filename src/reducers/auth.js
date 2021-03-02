import actions from '../store/actions';

const initialState = {
  waiting: true,
  state: null,
  tokenSet: false,
  user: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.LOGIN:
      return {
        ...state,
        waiting: true,
      };
    case actions.LOGGED_IN:
      return {
        ...state,
        state: payload.state,
        user: payload.user,
        waiting: false,
        tokenSet: true,
      };
    case actions.LOGOUT:
      return {
        ...state,
        user: {},
        tokenSet: false,
        waiting: true,
      };
    default:
      return state;
  }
};
