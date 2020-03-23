import { REQUEST, SUCCESS, FAILURE } from "../utils";
export const SELECT_PROJECT = "SELECT_PROJECT";
export const GET_PROJECTS = "GET_PROJECTS";

export default (state = {
  selectedProject: "",
  menuOptions: [],
  loading: false
}, action) => {
  switch (action.type) {
  case `${GET_PROJECTS}_${REQUEST}`:
    return {
      ...state,
      loading:true
    };
  case `${GET_PROJECTS}_${SUCCESS}`:
    return {
      loading: false,
      menuOptions: action.payload.data,
      selectedProject: action.payload.data[0]
    };
  case `${GET_PROJECTS}_${FAILURE}`:
    return {
      ...state,
      loading: false
    };
  case SELECT_PROJECT:
    return {
      ...state,
      selectedProject: action.payload
    };
  default:
    return state;
  }
};