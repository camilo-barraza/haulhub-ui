export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export const dispatchAPIActions = async (dispatch, actionName, callAPI) => {
  dispatch({ type: `${actionName}_${REQUEST}`.toUpperCase() });
  try {
    const response = await callAPI();
    dispatch({
      payload: {...response},
      type: `${actionName}_${SUCCESS}`.toUpperCase()
    });
  }
  catch (error) {
    dispatch({
      payload: error,
      type: `${actionName}_${FAILURE}`.toUpperCase()
    });
  }
};

export const bindDispatch = (dispatch, state, actions) => {
  let res = {};
  Object.keys(actions).forEach((key) => {
    res[key] = actions[key](dispatch, state);
  }); 
  return res;
};