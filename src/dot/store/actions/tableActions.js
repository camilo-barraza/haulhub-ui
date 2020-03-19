import { tables } from "../reducers/tableReducer";
import { 
  LOAD_MATERIALS_OPTIONS_REQUEST, 
  LOAD_MATERIALS_OPTIONS_SUCCESS, 
  LOAD_MATERIALS_OPTIONS_FAILURE 
} from "../reducers/materialsReducer";

import { reconciliationTableData, materialsTableData, menuOptions } from "../../mockData";

export const loadMaterialOptions = () => {
  return dispatch => {
    dispatch({
      types: [LOAD_MATERIALS_OPTIONS_REQUEST, LOAD_MATERIALS_OPTIONS_SUCCESS, LOAD_MATERIALS_OPTIONS_FAILURE],
      callAPI: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: menuOptions
          });
        }, 1000);
      })
    });
  };
};

export const loadTableFirstPage = (tableType) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      types: [
        tables[tableType].LOAD_TABLE_FIRST_PAGE_REQUEST, 
        tables[tableType].LOAD_TABLE_FIRST_PAGE_SUCCESS, 
        tables[tableType].LOAD_TABLE_FIRST_PAGE_FAILURE
      ],
      callAPI: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: tableType === state.reconciliationTable.tableType ? {
              totalPages: 3,
              payload:  reconciliationTableData
            }: {
              totalPages: 2,
              payload: materialsTableData
            }
          });
        }, 1000);
      })
    });
  };
};

export const loadTablePage = (tableType) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      types: [
        tables[tableType].LOAD_TABLE_PAGE_REQUEST,
        tables[tableType].LOAD_TABLE_PAGE_SUCCESS,
        tables[tableType].LOAD_TABLE_PAGE_FAILURE
      ],
      callAPI: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: tableType === state.reconciliationTable.tableType ? reconciliationTableData : materialsTableData
          });
        }, 1000);
      })
    });
  };
};