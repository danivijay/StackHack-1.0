import { combineReducers } from "redux";
import eventRegistration from "./eventRegistration";
import events from "./events";

export default combineReducers({
  eventRegistration,
  events,
});
