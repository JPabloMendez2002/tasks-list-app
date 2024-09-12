import { types } from "../types/types";

const initialState = {
  idUser: "",
  nameUser: "",
  emailUser: "",
  passwordUser: "",
  newPasswordUser: "",
  tokenUser: "",
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SetIDUser:
      return {
        ...state,
        idUser: action.payload,
      };
    case types.SetNameUser:
      return {
        ...state,
        nameUser: action.payload,
      };

    case types.SetEmailUser:
      return {
        ...state,
        emailUser: action.payload,
      };

    case types.SetPasswordUser:
      return {
        ...state,
        passwordUser: action.payload,
      };

    case types.SetTokenUser:
      return {
        ...state,
        tokenUser: action.payload,
      };

    case types.SetNewPasswordUser:
      return {
        ...state,
        newPasswordUser: action.payload,
      };

      case types.SetCleanProfile:
        return {
            idUser: "",
            nameUser: "",
            emailUser: "",
            passwordUser: "",
            newPasswordUser: "",
            tokenUser: "",
        }

    default:
      return state;
  }
};
