import {
  SELECT_PROJECT,
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_FAILURE,
} from "../reducers/projectSelectorReducer";

import { projects } from "../../mockData";

export const selectProject = (payload) => {
  return dispatch => {
    dispatch({
      type: SELECT_PROJECT,
      payload
    });
  };
};

export const loadProjects = () => {
  return dispatch => {
    dispatch({
      types: [LOAD_PROJECTS_REQUEST, LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_FAILURE],
      callAPI: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: projects
          });
        }, 1000);
      })
    });
  };
};

