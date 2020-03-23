import { REQUEST, SUCCESS, FAILURE } from "../utils";

export const tables = {
  reconciliation:{
    GET_TABLE_FIRST_PAGE: "GET_RECONCILIATION_TABLE_FIRST_PAGE",
    GET_TABLE_PAGE: "GET_RECONCILIATION_TABLE_PAGE",
  },
  materials:{
    GET_TABLE_FIRST_PAGE: "GET_MATERIALS_TABLE_FIRST_PAGE",
    GET_TABLE_PAGE: "GET_MATERIALS_TABLE_PAGE"
  }
};

export const initialState = {
  loading: false,
  currentPage: 0,
  loadedLastPage: false,
  totalPages: 0,
  data: []
};

export default (state = initialState, action, tableType) => {
  state = {...state, tableType};
  switch (action.type) {
  // --------------- First page ----------------------
  case `${tables[tableType].GET_TABLE_FIRST_PAGE}_${REQUEST}`:
    return {
      ...state,
      loading: true,
      currentPage: 1,
      loadedLastPage: false,
      data: []
    };
  case `${tables[tableType].GET_TABLE_FIRST_PAGE}_${SUCCESS}`:
    return {
      ...state,
      loading: false,
      totalPages: action.payload.data.totalPages,
      data: action.payload.data.payload
    };
  case `${tables[tableType].GET_TABLE_FIRST_PAGE}_${FAILURE}`:
    return {
      ...state,
      loading: false
    };
  // --------------- Next pages ----------------------
  case `${tables[tableType].GET_TABLE_PAGE}_${REQUEST}`:
    return {
      ...state,
      currentPage: state.currentPage + 1,
      loading: true,
    };
  case `${tables[tableType].GET_TABLE_PAGE}_${SUCCESS}`:
    return {
      ...state,
      loading: false,
      loadedLastPage: state.totalPages === state.currentPage,
      data: [...state.data, ...action.payload.data]
    };
  case `${tables[tableType].GET_TABLE_PAGE}_${FAILURE}`:
    return {
      ...state,
      currentPage: state.currentPage-1,
      loading: false
    };
  default:
    return state;
  }
};