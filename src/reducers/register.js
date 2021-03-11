import ActionTypes from '../store/actions';
import objectAssign from 'object-assign';

const initialState = {
  name: '',
  email: '',
  phone: '',
  findout: '',
  password: '',
  confirm: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.REGISTRATIONFORM:
      return objectAssign({}, state, payload);
    default:
      return state;
  }
};
