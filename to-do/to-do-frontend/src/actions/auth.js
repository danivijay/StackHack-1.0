export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const register = (payload) => (dispatch) => {
  dispatch({
    type: REGISTER,
    payload: payload,
  });
};

export const login = (payload) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: payload,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
