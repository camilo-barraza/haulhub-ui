import React, { useContext, useReducer } from "react";

export const FiltersContext = React.createContext();

export const FiltersProvider = ({
  children,
  date: initialDate,
  onDispatch
}) => {
  const reducer = (state, { type, payload }) => {
    const newState = Object.assign({}, state);
    switch (type) {
    case "set": {
      newState[payload.key] = payload.value;
      break;
    }
    case "setDate": {
      newState.date = payload;
      break;
    }
    default: {
      throw new Error(`Unhandled action type for FiltersContext: ${type}`);
    }
    }
    if (onDispatch) {
      debugger;
      onDispatch({ type, payload }, newState);
    }
    return newState;
  };

  const [state, dispatch] = useReducer(reducer, {
    date: initialDate,
    showUnfilledShifts: false,
    totalShiftsCount: 0,
    uninvitedShiftsCount: 0,
    invitedShiftsCount: 0,
    acceptedShiftsCount: 0
  });
  return (
    <FiltersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (typeof context === "undefined") {
    throw new Error("useFilters() called outside of a FiltersProvider");
  }
  return context;
};
