import { 
  OPEN_TICKETS_PANEL,
  CLOSE_TICKETS_PANEL,
  LOAD_TICKETS_REQUEST,
  LOAD_TICKETS_FAILURE,
  LOAD_TICKETS_SUCCESS
} from "./reducers";

const mockData = [
  {
    number: "64058703",
    time: "2018-08-29 11:10:46.526069",
    accepted: true,
    truck: "EZ742",
    material: "18.29 Tons  12.MMSP"
  },
  {
    number: "64058703",
    time: "2018-08-29 11:10:46.526069",
    accepted: false,
    truck: "EZ742",
    material: "18.29 Tons  12.MMSP"
  },
  {
    number: "64058703",
    time: "2018-08-29 11:10:46.526069",
    accepted: true,
    truck: "EZ742",
    material: "18.29 Tons  12.MMSP"
  }
];

export const loadTickets = (itemId) => {
  return dispatch => {
    dispatch({
      types: [LOAD_TICKETS_REQUEST, LOAD_TICKETS_SUCCESS, LOAD_TICKETS_FAILURE],
      callAPI: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: mockData
          });
        }, 1000);
      })
    });
  };
};

export const openTicketsPanel = (payload) => {
  return async dispatch => {
    dispatch({
      type: OPEN_TICKETS_PANEL
    });
  };
};

export const closeTicketsPanel = (payload) => {
  return async dispatch => {
    dispatch({
      type: CLOSE_TICKETS_PANEL
    });
  };
};