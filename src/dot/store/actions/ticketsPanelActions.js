import {  OPEN_TICKETS_PANEL, CLOSE_TICKETS_PANEL, GET_TICKETS } from "../reducers/ticketsPanelReducer";
import { dispatchAPIActions } from "../utils";
import { ticketDetailsData } from "../../mockData";

export const openTicketsPanel = (dispatch) => {
  return (selectedItem, selectedFilter, selectedMaterial = "") => {
    dispatchAPIActions(dispatch, GET_TICKETS, () => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: ticketDetailsData
        });
      }, 1000);
    }));
    dispatch({
      type: OPEN_TICKETS_PANEL,
      payload: { selectedItem, selectedFilter, selectedMaterial } 
    });
  };
};

export const closeTicketsPanel = (dispatch) => {
  return () => {
    dispatch({
      type: CLOSE_TICKETS_PANEL
    });
  };
};