import ActionTypes from '../store/actions';
import objectAssign from 'object-assign';

const initialState = {
  width: 0,
  height: 0,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_ORIENTATION:
      return objectAssign({}, state, {
        width: payload.width,
        height: payload.height,
      });
    default:
      return state;
  }
};
