export const OPEN_TICKETS_PANEL = "OPEN_TICKETS_PANEL";
export const CLOSE_TICKETS_PANEL = "CLOSE_TICKETS_PANEL";

export const LOAD_TICKETS_REQUEST = "LOAD_TICKETS_REQUEST";
export const LOAD_TICKETS_SUCCESS = "LOAD_TICKETS_SUCCESS";
export const LOAD_TICKETS_FAILURE = "LOAD_TICKETS_FAILURE";

const initState = {
  isOpen: false,
  data: {
    loading: false,
    tickets:[
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
    ]
  }
};

const ticketsPanelReducer = (state = initState, action) => {
  switch (action.type) {
  case OPEN_TICKETS_PANEL:
    return {
      ...state,
      isOpen: true
    };
  case CLOSE_TICKETS_PANEL:
    return {
      ...state,
      isOpen: false
    };
  case LOAD_TICKETS_REQUEST:
    return {
      ...state,
      data: {
        tickets:[],
        loading: true
      }
    };
  case LOAD_TICKETS_SUCCESS:
    return {
      ...state,
      data: {
        tickets: action.response.data,
        loading: false
      }
    };
  case LOAD_TICKETS_FAILURE:
    return {
      ...state,
      data: {
        ...state.data.tickets,
        loading: false
      }
    }; 
  default:
    return state;
  }
};


const rootReducer = (state = {}, action) => {
  return {
    ticketsPanel: ticketsPanelReducer(state.ticketsPanel, action),
  };
};

export default rootReducer;