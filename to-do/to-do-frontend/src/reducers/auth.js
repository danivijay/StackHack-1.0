import dayjs from "dayjs";

const initialState = {
  user_id: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        user_id: action.user_id,
      };
    case "LOGIN":
      return {
        ...state,
        user_id: action.user_id,
      };
    case "LOGOUT":
      return {
        ...state,
        user_id: "",
      };
    default:
      return state;
  }
};

export default reducer;
