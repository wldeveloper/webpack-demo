export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';

const fetchToken = () => dispatch => {
  dispatch({
    type: RECEIVE_TOKEN_SUCCESS,
    text: '应用Token获取成功',
    data: { msg: 'test' },
  });
};

export default {
  fetchToken,
};
