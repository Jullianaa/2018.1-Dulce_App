import {LOGIN, LOGOUT} from '../Actions/currentUser';

const initialState = {};

function currentUser(state = initialState,action) {
  switch (action.type) {
    case LOGIN:
      return action.currentUser;
    case LOGOUT:
      return action.currentUser;

    default:
      return initialState;
  }
}

export default currentUser;
