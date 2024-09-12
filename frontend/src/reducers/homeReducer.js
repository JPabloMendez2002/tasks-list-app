import { types } from "../types/types";

const initialState = {
  currentTabInventory: "",
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SetCurrentTab:
      return {
        ...state,
        currentTabInventory: action.payload,
      };

    case types.SetCleanPages:
      return {
        currentTabInventory: "",
      }

    default:
      return state;
  }
};
