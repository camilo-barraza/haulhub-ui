import { useReducer } from "react";
import rootReducer from "./reducers/root";
import { selectProject, loadProjects } from "./actions/projectSelectorActions";
import { loadMaterialOptions, loadTableFirstPage, loadTablePage } from "./actions/tableActions";
import { openTicketsPanel, closeTicketsPanel } from "./actions/ticketsPanelActions";
import { bindDispatch } from "./utils";

export const useStore = () => {
  const [state, dispatch] = useReducer(rootReducer);
  if(!state)
    dispatch("init");

  return [{
    ...state
  },
  {
    ...bindDispatch(dispatch, state, {
      selectProject,
      loadProjects,
      loadMaterialOptions,
      loadTableFirstPage,
      loadTablePage,
      openTicketsPanel,
      closeTicketsPanel
    })
  },
  dispatch
  ];
};
