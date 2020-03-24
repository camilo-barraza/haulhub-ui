import React, { useContext, useReducer, useState } from "react";

const FlashContext = React.createContext();

const reducer = (state, { type, payload }) => {
  const newState = Object.assign({}, state);
  switch (type) {
  case "show": {
    newState.isOpen = true;
    newState.severity = payload.severity || "success";
    newState.message = payload.message;
    break;
  }
  case "hide": {
    newState.isOpen = false;
    break;
  }
  default: {
    throw new Error(`Unhandled action type for FlashContext: ${type}`);
  }
  }
  if (state.onDispatch) {
    state.onDispatch({ type, payload }, newState);
  }
  return newState;
};

const FlashProvider = ({ children, onDispatch }) => {
  const [state, dispatch] = useReducer(reducer, {
    onDispatch,
    isOpen: false,
    message: "",
    severity: "success"
  });
  const { isOpen, message, severity } = state;

  const showFlash = (payload) => {
    dispatch({ type: "show", payload });
  };

  return (
    <FlashContext.Provider value={{ state, dispatch, showFlash, setTest }}>
      {children}
    </FlashContext.Provider>
  );
};
export default FlashProvider;

export const useFlash = () => {
  const context = useContext(FlashContext);
  if (typeof context === "undefined") {
    throw new Error("useFlash must be used within a FlashContext");
  }
  return context;
};
