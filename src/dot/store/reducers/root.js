import ticketsPanelReducer from "./ticketsPanelReducer";
import projectSelectorReducer from "./projectSelectorReducer";
import tableReducer from "./tableReducer";
import materialsReducer from "./materialsReducer";

const rootReducer = (state = {}, action) => {
  return {
    projectSelector: projectSelectorReducer(state.projectSelector, action),
    ticketsPanel: ticketsPanelReducer(state.ticketsPanel, action),
    materials: materialsReducer(state.materials, action),
    reconciliationTable: tableReducer(state.reconciliationTable, action, "reconciliation" ),
  };
};

export default rootReducer;