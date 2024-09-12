import { localAPI } from "../api/localAPI";
import { types } from "../types/types";
import Swal from "sweetalert2";

//---------------------------------------------API Actions
export const startGetDataTasks = () => {
  return async (dispatch, getState) => {
    try {
      const { tokenUser } = getState().stateProfile;
      const config = {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      };
      const { data, status } = await localAPI.get("/tasks/consult", config);
      dispatch(SetDataTasks(data))
    } catch (error) {
      console.log(error);
    }
  };
};

export const insertNewTask = (tasksData) => {
  return async (dispatch, getState) => {
    const { tokenUser } = getState().stateProfile;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await localAPI.post("/tasks/create", tasksData, config);
      if (response.status === 201) {
        const data = response.data;
        Swal.fire("Success!", 'The task is really insert.', 'success');
        dispatch(SetTitleTasks(""))
        dispatch(SetDescriptionTasks(""))
        dispatch(startGetDataTasks())
      } else {
        Swal.fire("Error!", 'Failed to insert the data.', 'error');
      }
    } catch (error) {
      console.error('Error inserting task:', error);
      Swal.fire("Error!", 'An error occurred while inserting.', 'error');
    }
  };
};

export const updateTask = (taskId, updatedTaskData) => {
  return async (dispatch, getState) => {
    const { tokenUser } = getState().stateProfile;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await localAPI.put(`/tasks/update/${taskId}`, updatedTaskData, config);
      if (response.status === 200) {
        Swal.fire("Success!", 'Task updated successfully.', 'success');
        dispatch(startGetDataTasks()); 
      } else {
        Swal.fire("Error!", 'Failed to update the task.', 'error');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      Swal.fire("Error!", 'An error occurred while updating.', 'error');
    }
  };
};

export const deleteTask = (taskId) => {
  return async (dispatch, getState) => {
    const { tokenUser } = getState().stateProfile;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      };
      await localAPI.delete(`/tasks/delete/${taskId}`, config);
      Swal.fire("Success!", 'Task deleted successfully.', 'success');
      dispatch(startGetDataTasks());
    } catch (error) {
      console.error('Error deleting task:', error);
      Swal.fire("Error!", 'An error occurred while deleting.', 'error');
    }
  };
};

//---------------------------------------------API Actions

//---------------------------------------------Normal Actions

export const SetDataTasks = (value) => ({
  type: types.SetDataTasks,
  payload: value,
});

export const SetTitleTasks = (value) => ({
  type: types.SetTitleTasks,
  payload: value,
});

export const SetDescriptionTasks = (value) => ({
  type: types.SetDescriptionTasks,
  payload: value,
});


export const SetCleanTasks = () => ({
  type: types.SetCleanTasks
})
//---------------------------------------------FIN Normal Actions
