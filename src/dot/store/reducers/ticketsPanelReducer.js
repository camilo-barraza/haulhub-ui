import { REQUEST, SUCCESS, FAILURE } from "../utils";

export const OPEN_TICKETS_PANEL = "OPEN_TICKETS_PANEL";
export const CLOSE_TICKETS_PANEL = "CLOSE_TICKETS_PANEL";

export const GET_TICKETS = "GET_TIKCETS";

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
  case `${GET_TICKETS}_${REQUEST}`:
    return {
      ...state,
      data: {
        tickets: [],
        loading: true
      }
    };
  case `${GET_TICKETS}_${SUCCESS}`:
    return {
      ...state,
      data: {
        tickets: action.payload.data,
        loading: false
      }
    };
  case `${GET_TICKETS}_${FAILURE}`:
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
