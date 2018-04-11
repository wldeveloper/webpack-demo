import { RECEIVE_TOKEN_SUCCESS } from '../actions/home';

const token = (state = { fetching: true }, action) => {
  switch (action.type) {
    case RECEIVE_TOKEN_SUCCESS:
      return {
        ...action.data,
        fetching: false,
      };
    default:
      return state;
  }
};

export default {
  token,
};
