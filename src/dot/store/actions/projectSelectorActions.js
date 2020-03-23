import { GET_PROJECTS, SELECT_PROJECT } from "../reducers/projectSelectorReducer";
import { dispatchAPIActions } from "../utils";
import { projects } from "../../mockData";

export const selectProject = (dispatch) => {
  return (payload) => {
    dispatch({
      type: SELECT_PROJECT,
      payload
    });
  };
};

export const loadProjects = (dispatch) => {
  return () => {
    dispatchAPIActions(dispatch, GET_PROJECTS, () => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: projects
        });
      }, 1000);
    }));
  };
};

