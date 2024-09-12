import { types } from "../types/types";

//---------------------------------------------Normal Actions
export const SetCurrentTab = (value) => ({
  type: types.SetCurrentTab,
  payload: value,
});

export const SetCleanPages = () => ({
  type: types.SetCleanPages
})

//---------------------------------------------FIN Normal Actions
