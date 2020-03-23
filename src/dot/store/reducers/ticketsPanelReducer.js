export const OPEN_TICKETS_PANEL = "OPEN_TICKETS_PANEL";
export const CLOSE_TICKETS_PANEL = "CLOSE_TICKETS_PANEL";

export const LOAD_TICKETS_REQUEST = "LOAD_TICKETS_REQUEST";
export const LOAD_TICKETS_SUCCESS = "LOAD_TICKETS_SUCCESS";
export const LOAD_TICKETS_FAILURE = "LOAD_TICKETS_FAILURE";

export default (state = {
  isOpen: false,
  selectedItem: "",
  selectedFilter: "",
  selectedMaterial: "",
  data: {
    loading: false,
    tickets: []
  }
}, action) => {
  switch (action.type) {
  case OPEN_TICKETS_PANEL:
    return {
      ...state,
      selectedItem: action.payload.selectedItem,
      selectedFilter: action.payload.selectedFilter,
      selectedMaterial: action.payload.selectedMaterial,
      isOpen: true
    };
  case CLOSE_TICKETS_PANEL:
    return {
      ...state,
      selectedItem:"",
      selectedFilter:"",
      selectedMaterial: "",
      isOpen: false
    };
  case LOAD_TICKETS_REQUEST:
    return {
      ...state,
      data: {
        tickets: [],
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
