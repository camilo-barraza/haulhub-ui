import { tables } from "../reducers/tableReducer";
import { GET_MATERIALS_OPTIONS } from "../reducers/materialsReducer";
import { reconciliationTableData, materialsTableData, menuOptions } from "../../mockData";
import { dispatchAPIActions } from "../utils";

export const loadMaterialOptions = (dispatch) => {
  return () => {
    dispatchAPIActions(dispatch, GET_MATERIALS_OPTIONS, () => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: menuOptions
        });
      }, 1000);
    }));
  };
};

export const loadTableFirstPage = (dispatch, state) => {
  return (tableType) => {
    dispatchAPIActions(dispatch, tables[tableType].GET_TABLE_FIRST_PAGE, () => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: tableType === state.reconciliationTable.tableType ? {
            totalPages: 3,
            payload: reconciliationTableData
          } : {
            totalPages: 2,
            payload: materialsTableData
          }
        });
      }, 1000);
    }));
  };
};

export const loadTablePage = (dispatch, state) => {
  return (tableType) => {
    dispatchAPIActions(dispatch, tables[tableType].GET_TABLE_PAGE, () => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: tableType === state.reconciliationTable.tableType ? reconciliationTableData : materialsTableData
        });
      }, 1000);
    }));
  };
};