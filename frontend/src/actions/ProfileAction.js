import Swal from "sweetalert2";
import { localAPI } from "../api/localAPI";
import { types } from "../types/types";
import { SetCleanTasks } from "./TasksAction";
import { SetCleanPages } from "./HomeAction";

//---------------------------------------------INICIO API Actions
export const startGetDataUser = () => {
  return async (dispatch, getState) => {
    try {
      const { tokenUser } = getState().stateProfile;
      const config = {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      };
      const { data } = await localAPI.get("/users/profile", config);
      dispatch(SetNameUser(data.name))
      dispatch(SetEmailUser(data.email))
      dispatch(SetIDUser(data._id))

    } catch (error) {
      console.log(error);
    }
  };
};

export const updateDataUser = (userData) => {
  return async (dispatch, getState) => {
    const { tokenUser } = getState().stateProfile;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await localAPI.put("/users/profile", userData, config);
      if (response.status === 200) {
        Swal.fire("Success!", 'The data is really updated.', 'success');
      } else {
        Swal.fire("Error!", 'Failed to update the data.', 'error');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire("Error!", 'An error occurred while updating.', 'error');
    }
  };
};

export const updatePasswordUser = (userPasswords) => {
  return async (dispatch, getState) => {
    const { tokenUser } = getState().stateProfile;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await localAPI.put("/users/password", userPasswords, config);
      if (response.status === 200) {
        Swal.fire("Success!", 'The password is really updated.', 'success').then(() => {
          setTimeout(() => {
            window.location.reload(); 
          }, 1000);
        });
      } else {
        Swal.fire("Error!", 'Failed to update the password.', 'error');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Swal.fire("Error!", 'Invalid current password.', 'error');
    }
  };
};

export const startLogin = (userData) => {
  return async (dispatch) => {
      try {
          const { data } = await localAPI.post('/users/login', userData);
          dispatch(SetTokenUser(data.token))
          return true;
      } catch (error) {
          Swal.fire('Error!', 'Incorrect email or password.', 'error');
          return false;
      }
  };
};

export const startRegister = (userData) => {
  return async (dispatch) => {
      try {
          const { data } = await localAPI.post('/users/register', userData);
          dispatch(SetTokenUser(data.token))
          return true;
      } catch (error) {
          Swal.fire('Error!', 'Registration failed.', 'error');
          return false;
      }
  };
};

export const startLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch(SetCleanProfile());
        dispatch(SetCleanTasks());
        dispatch(SetCleanPages());
        
    };
};
//---------------------------------------------FIN API Actions


//---------------------------------------------Normal Actions

export const SetIDUser = (value) => ({
  type: types.SetIDUser,
  payload: value,
});

export const SetNameUser = (value) => ({
  type: types.SetNameUser,
  payload: value,
});

export const SetEmailUser = (value) => ({
  type: types.SetEmailUser,
  payload: value,
});

export const SetPasswordUser = (value) => ({
  type: types.SetPasswordUser,
  payload: value,
});

export const SetTokenUser = (value) => ({
  type: types.SetTokenUser,
  payload: value,
});

export const SetNewPasswordUser = (value) => ({
  type: types.SetNewPasswordUser,
  payload: value,
});

export const SetCleanProfile = () => ({
    type: types.SetCleanProfile
})




//---------------------------------------------FIN Normal Actions
