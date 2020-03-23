import { 
  OPEN_TICKETS_PANEL,
  CLOSE_TICKETS_PANEL,
  LOAD_TICKETS_REQUEST,
  LOAD_TICKETS_FAILURE,
  LOAD_TICKETS_SUCCESS
} from "../reducers/ticketsPanelReducer";

import { ticketDetailsData } from "../../mockData";

export const openTicketsPanel = (selectedItem, selectedFilter, selectedMaterial = "") => {
  return async dispatch => {

    console.log(`loading tickets ${selectedFilter} for ${selectedItem}`);
    dispatch({
      types: [LOAD_TICKETS_REQUEST, LOAD_TICKETS_SUCCESS, LOAD_TICKETS_FAILURE],
      callAPI: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: ticketDetailsData
          });
        }, 1000);
      })
    });

    dispatch({
      type: OPEN_TICKETS_PANEL,
      payload: { selectedItem, selectedFilter, selectedMaterial } 
    });
  };
};

export const closeTicketsPanel = () => {
  return async dispatch => {
    dispatch({
      type: CLOSE_TICKETS_PANEL
    });
  };
};