import { tables } from "../reducers/tableReducer";
import { reconciliationTableData, materialsTableData } from "../../mockData";

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
            data: {
              totalPages: 3,
              payload: tableType === state.reconciliationTable.tableType? reconciliationTableData : materialsTableData
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