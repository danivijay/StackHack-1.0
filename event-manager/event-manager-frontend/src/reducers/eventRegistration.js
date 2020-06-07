// follows Ducks pattern (https://github.com/erikras/ducks-modular-redux)
import axios from "axios";
import { baseURL } from "../constants/generalConstants";

const defaultValues = {
  email: "",
  full_name: "",
  mobile: "",
  number_of_tickets: "",
  registration_type: "",
  url: "",
};

const initialState = {
  eventRegistrationDetails: defaultValues,
};

const EVENT_REGISTER_DATA = "EVENT_REGISTER_DATA";
const EVENT_PREPARE_DATA = "EVENT_PREPARE_DATA";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_PREPARE_DATA:
      return {
        ...state,
        eventRegistrationDetails: action.payload,
      };
    case EVENT_REGISTER_DATA:
      return {
        ...state,
        eventRegistrationDetails: defaultValues,
      };
    default:
      return state;
  }
};

export const addEventRegistration = (payload) => (dispatch) => {
  return axios.post(`${baseURL}/event/register`, payload).then((data) => {
    if (data?.data?.success) {
      dispatch({
        type: EVENT_REGISTER_DATA,
      });
    }
    return {
      success: true,
      id: data?.data?.data?.id,
      number_of_tickets: data?.data?.data?.number_of_tickets,
    };
  });
};

export const addEventRegistrationPreview = (payload) => (dispatch) => {
  dispatch({
    type: EVENT_PREPARE_DATA,
    payload: payload,
  });
};

export default reducer;
