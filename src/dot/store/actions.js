import { 
  OPEN_TICKETS_PANEL,
  CLOSE_TICKETS_PANEL,
  LOAD_TICKETS_REQUEST,
  LOAD_TICKETS_FAILURE,
  LOAD_TICKETS_SUCCESS
} from "./reducers";

import { ticketDetailsData } from "../mockData";

export const loadTickets = (itemId) => {
  return dispatch => {
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
  };
};

export const openTicketsPanel = () => {
  return async dispatch => {
    dispatch({
      type: OPEN_TICKETS_PANEL
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