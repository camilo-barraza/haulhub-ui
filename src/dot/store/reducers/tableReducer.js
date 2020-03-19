export const tables = {
  reconciliation:{
    LOAD_TABLE_FIRST_PAGE_REQUEST: "LOAD_RECONCILIATION_FIRST_PAGE_REQUEST",
    LOAD_TABLE_FIRST_PAGE_SUCCESS: "LOAD_RECONCILIATION_FIRST_PAGE_SUCCESS",
    LOAD_TABLE_FIRST_PAGE_FAILURE: "LOAD_RECONCILIATION_FIRST_PAGE_FAILURE",
    LOAD_TABLE_PAGE_REQUEST: "LOAD_RECONCILIATION_PAGE_REQUEST",
    LOAD_TABLE_PAGE_SUCCESS: "LOAD_RECONCILIATION_PAGE_SUCCESS",
    LOAD_TABLE_PAGE_FAILURE: "LOAD_RECONCILIATION_PAGE_FAILURE",
  },
  materials:{
    LOAD_TABLE_FIRST_PAGE_REQUEST: "LOAD_MATERIALS_FIRST_PAGE_REQUEST",
    LOAD_TABLE_FIRST_PAGE_SUCCESS: "LOAD_MATERIALS_FIRST_PAGE_SUCCESS",
    LOAD_TABLE_FIRST_PAGE_FAILURE: "LOAD_MATERIALS_FIRST_PAGE_FAILURE",
    LOAD_TABLE_PAGE_REQUEST: "LOAD_MATERIALS_PAGE_REQUEST",
    LOAD_TABLE_PAGE_SUCCESS: "LOAD_MATERIALS_PAGE_SUCCESS",
    LOAD_TABLE_PAGE_FAILURE: "LOAD_MATERIALS_PAGE_FAILURE",
  }
};

export default (state = {
  loading: false,
  currentPage: 0,
  loadedLastPage: false,
  totalPages: 0,
  data: []
}, action, tableType) => {
  state = {...state, tableType};
  switch (action.type) {
  // --------------- First page ----------------------
  case tables[tableType].LOAD_TABLE_FIRST_PAGE_REQUEST:
    return {
      ...state,
      loading: true
    };
  case tables[tableType].LOAD_TABLE_FIRST_PAGE_SUCCESS:
    return {
      ...state,
      loading: false,
      currentPage: 1,
      totalPages: action.response.data.totalPages,
      data: action.response.data.payload
    };
  case tables[tableType].LOAD_TABLE_FIRST_PAGE_FAILURE:
    return {
      ...state,
      loading: false
    };
  // --------------- Next pages ----------------------
  case tables[tableType].LOAD_TABLE_PAGE_REQUEST:
    return {
      ...state,
      currentPage: state.currentPage + 1,
      loading: true,
    };
  case tables[tableType].LOAD_TABLE_PAGE_SUCCESS:
    return {
      ...state,
      loading: false,
      loadedLastPage: state.totalPages === state.currentPage,
      data: [...state.data, ...action.response.data]
    };
  case tables[tableType].LOAD_TABLE_PAGE_FAILURE:
    return {
      ...state,
      currentPage: state.currentPage-1,
      loading: false
    };
  default:
    return state;
  }
};