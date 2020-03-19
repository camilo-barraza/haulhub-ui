import tableReducer from "./tableReducer";

export const LOAD_MATERIALS_OPTIONS_REQUEST = "LOAD_MATERIALS_OPTIONS_REQUEST";
export const LOAD_MATERIALS_OPTIONS_SUCCESS = "LOAD_MATERIALS_OPTIONS_SUCCESS";
export const LOAD_MATERIALS_OPTIONS_FAILURE = "LOAD_MATERIALS_OPTIONS_FAILURE";

export default (state = {}, action) => {
  return {
    menuOptions: menuOptionsReducer(state.menuOptions, action),
    table: tableReducer(state.table, action, "materials" ),
  };
};

const menuOptionsReducer = (state = {
  loading: false,
  data: []
}, action) => {
  switch (action.type) {
  case LOAD_MATERIALS_OPTIONS_REQUEST:
    return {
      ...state,
      loading: true
    };
  case LOAD_MATERIALS_OPTIONS_SUCCESS:
    return {
      ...state,
      data: action.response.data,
      loading: false
    };
  case LOAD_MATERIALS_OPTIONS_FAILURE:
    return {
      ...state,
      data: [],
      loading: false
    };
  default:
    return state;
  }
};
