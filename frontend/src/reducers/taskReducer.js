import { types } from "../types/types";

const initialState = {
  dataTasks: [],
  titleNewTasks: "",
  descriptionNewTasks: "",
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SetDataTasks:
      return {
        ...state,
        dataTasks: action.payload,
      };

    case types.SetTitleTasks:
      return {
        ...state,
        titleNewTasks: action.payload,
      };

    case types.SetDescriptionTasks:
      return {
        ...state,
        descriptionNewTasks: action.payload,
      };

    case types.SetCleanTasks:
      return {
        dataTasks: [],
        titleNewTasks: "",
        descriptionNewTasks: "",
      }

    default:
      return state;
  }
};
