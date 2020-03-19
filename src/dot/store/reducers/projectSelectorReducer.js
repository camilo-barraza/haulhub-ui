export const SELECT_PROJECT = "SELECT_PROJECT";
export const LOAD_PROJECTS_REQUEST = "LOAD_PROJECTS_REQUEST";
export const LOAD_PROJECTS_SUCCESS = "LOAD_PROJECTS_SUCCESS";
export const LOAD_PROJECTS_FAILURE = "LOAD_PROJECTS_FAILURE";

export default (state = {
  selectedProject: "",
  menuOptions: [],
  loading: false
}, action) => {
  switch (action.type) {
  case LOAD_PROJECTS_REQUEST:
    return {
      ...state,
      loading:true
    };
  case LOAD_PROJECTS_SUCCESS:
    return {
      loading: false,
      menuOptions: action.response.data,
      selectedProject: action.response.data[0]
    };
  case LOAD_PROJECTS_FAILURE:
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