// follows Ducks pattern (https://github.com/erikras/ducks-modular-redux)
import axios from "axios";
import { baseURL } from "../constants/generalConstants";

const events = [
  {
    name: "Stack Hackathon",
    id: "123",
    desc: "This is a sample event created just for testing purposes.",
  },
  {
    name: "Sample Conference",
    id: "124",
    desc: "This is another sample event",
  },
];

const initialState = {
  events: events,
};

const GET_EVENTS = "GET_EVENTS";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};

export const getEvents = () => (dispatch) => {
  axios.get(`${baseURL}/events`).then((data) => {
    if (data?.data?.success) {
      dispatch({
        type: GET_EVENTS,
        payload: data?.data?.data,
      });
    }
  });
};

export default reducer;
