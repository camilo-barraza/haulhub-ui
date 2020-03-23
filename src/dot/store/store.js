import { useReducer, useEffect } from "react";
import rootReducer from "./reducers/root";
import { selectProject, loadProjects } from "./actions/projectSelectorActions";
import { loadMaterialOptions, loadTableFirstPage, loadTablePage } from "./actions/tableActions";
import { openTicketsPanel, closeTicketsPanel } from "./actions/ticketsPanelActions";
import { bindDispatch } from "./utils";

export const useStore = () => {
  const [state, dispatch] = useReducer(rootReducer);

  if(!state){
    dispatch("init");
  }
  console.log(state);

  return [{
    ...state
  },
  {
    selectProject: selectProject(dispatch, state),
    loadProjects: loadProjects(dispatch, state),
    loadMaterialOptions: loadMaterialOptions(dispatch, state),
    loadTableFirstPage: loadTableFirstPage(dispatch, state),
    loadTablePage: loadTablePage(dispatch, state),
    openTicketsPanel: openTicketsPanel(dispatch, state),
    closeTicketsPanel: closeTicketsPanel(dispatch, state)
  },
  dispatch
  ];
};
