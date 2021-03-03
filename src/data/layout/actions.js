import ActionTypes from '../../store/actions';

export function setOrientation(width, height) {
  return {type: ActionTypes.SET_ORIENTATION, payload: {width, height}};
}
