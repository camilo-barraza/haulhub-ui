import { REQUEST, SUCCESS, FAILURE } from "../utils";
import tableReducer from "./tableReducer";

export const GET_MATERIALS_OPTIONS = "GET_MATERIAL_OPTIONS";

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
  case `${GET_MATERIALS_OPTIONS}_${REQUEST}`:
    return {
      ...state,
      loading: true
    };
  case `${GET_MATERIALS_OPTIONS}_${SUCCESS}`:
    return {
      ...state,
      data: action.payload.data,
      loading: false
    };
  case `${GET_MATERIALS_OPTIONS}_${FAILURE}`:
    return {
      ...state,
      data: [],
      loading: false
    };
  default:
    return state;
  }
};
