import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { startGetDataTasks, insertNewTask, updateTask, deleteTask, SetTitleTasks, SetDescriptionTasks } from "../../actions/TasksAction";
import { FaCircleCheck, FaFloppyDisk, FaTrash } from "react-icons/fa6";
import { FaEdit, FaExclamation, FaPlusCircle } from "react-icons/fa";
import { MdOutlineSubtitles, MdOutlineTitle } from "react-icons/md";

export const TasksBody = () => {
  const dispatch = useDispatch();
  const { dataTasks, titleNewTasks, descriptionNewTasks } = useSelector(state => state.stateTasks);

  const [showCompleted, setShowCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    dispatch(startGetDataTasks());
  }, [dispatch]);

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const addTask = () => {
    if (!titleNewTasks.trim()) {
      Swal.fire("Error", "The title field cannot be empty.", "error");
      return;
    }

    if (!descriptionNewTasks.trim()) {
      Swal.fire("Error", "The description field cannot be empty.", "error");
      return;
    }
    const newTask = {
      title: titleNewTasks,
      description: descriptionNewTasks,
    };
    dispatch(insertNewTask(newTask));
  };

  const completeTask = (task) => {
    const updatedTask = { ...task, completed: !task.completed, updatedAt: new Date().toISOString() };
    dispatch(updateTask(task._id, updatedTask));
  };

  const removeTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const startEditTask = (task) => {
    setIsEditing(true);
    setEditTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEditTask = () => {
    if (!editTitle.trim()) {
      Swal.fire("Error", "The title field cannot be empty.", "error");
      return;
    }

    if (!editDescription.trim()) {
      Swal.fire("Error", "The description field cannot be empty.", "error");
      return;
    }

    const updatedTask = {
      title: editTitle,
      description: editDescription,
      completed: dataTasks.find(task => task._id === editTaskId).completed,
    };

    dispatch(updateTask(editTaskId, updatedTask));
    cancelEdit();
  };

  const filteredTasks = dataTasks.filter(task => task.completed === showCompleted);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tasks List</h2>
      <hr />
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <h5>Task Title</h5>
          <div className="input-group">
            <span className="input-group-text">
              <MdOutlineTitle />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Title of Tasks"
              value={titleNewTasks}
              onChange={(e) => handleInputChangeWithDispatch(e, SetTitleTasks)}
            />
          </div>
        </div>

        <div className="col-md-6 mb-2">
          <h5>Task Description</h5>
          <div className="input-group">
            <span className="input-group-text">
              <MdOutlineSubtitles />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Description of Tasks"
              value={descriptionNewTasks}
              onChange={(e) => handleInputChangeWithDispatch(e, SetDescriptionTasks)}
            />
          </div>
        </div>
      </div>

      <hr />
      <button className="btn btn-success mb-4" onClick={addTask}>
        Add New Task <FaPlusCircle className="iconSize" />
      </button>

      <button
        className={`btn mb-4 ms-2 ${showCompleted ? 'btn-dark' : 'btn-primary'}`}
        onClick={() => setShowCompleted(!showCompleted)}
      >
        {showCompleted ? "Show Pending Tasks" : "Show Complete Tasks "}
        {showCompleted ? <FaExclamation className="iconSize" /> : <FaCircleCheck className="iconSize" />}
      </button>

      <div className="row">
        {filteredTasks.map((task) => (
          <div key={task._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>{task.title}</h5>
                <small>
                  {task.completed ? (
                    <span className="text-success">Completed</span>
                  ) : (
                    <span className="text-danger">Incomplete</span>
                  )}
                </small>
              </div>
              <div className="card-body">
                <p>{task.description}</p>
                <p>
                  <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}
                </p>
                {task.completed ?
                  <>
                    <button
                      className="btn btn-outline-dark mb-2"
                      onClick={() => completeTask(task)}
                    >
                      Maark as Pending <FaExclamation />
                    </button>
                  </>
                  :
                  <>
                    <button
                      className="btn btn-outline-primary mb-2"
                      onClick={() => completeTask(task)}
                    >
                      Maark as Completed <FaCircleCheck />
                    </button>
                  </>}
                <button
                  className="btn btn-outline-warning ms-2 mb-2"
                  onClick={() => startEditTask(task)}
                >
                  Edit <FaEdit />
                </button>
                <button
                  className="btn btn-outline-danger ms-2 mb-2"
                  onClick={() => removeTask(task._id)}
                >
                  Delete <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task <FaEdit /></h5>
                <button type="button" className="btn-close" onClick={cancelEdit}></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-2">
                  <span className="input-group-text">
                    <MdOutlineTitle />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Edit Title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text">
                    <MdOutlineSubtitles />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Edit Description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-warning" onClick={saveEditTask}>
                  Save Changes <FaFloppyDisk />
                </button>
                <button className="btn btn-danger" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksBody;
