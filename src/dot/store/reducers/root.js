import ticketsPanelReducer from "./ticketsPanelReducer";
import projectSelectorReducer from "./projectSelectorReducer";
import tableReducer from "./tableReducer";

const rootReducer = (state = {}, action) => {
  return {
    projectSelector: projectSelectorReducer(state.projectSelector, action),
    ticketsPanel: ticketsPanelReducer(state.ticketsPanel, action),
    materialsTable: tableReducer(state.materialsTable, action, "materials"),
    reconciliationTable: tableReducer(state.reconciliationTable, action, "reconciliation" ),
  };
};

export default rootReducer;