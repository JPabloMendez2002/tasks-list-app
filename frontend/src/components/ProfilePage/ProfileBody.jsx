import React, { useState, useEffect } from "react";
import { FaUserCheck, FaUser, FaEnvelope, FaKey, FaFloppyDisk } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { SetEmailUser, SetNameUser, startGetDataUser, updateDataUser } from "../../actions/ProfileAction";
import ProfilePasswordModal from "./ProfilePasswordModal";
import Swal from "sweetalert2";

export const ProfileBody = () => {
  const dispatch = useDispatch();
  const { idUser, nameUser, emailUser } = useSelector(state => state.stateProfile);
  useEffect(() => {
    dispatch(startGetDataUser());
  }, [dispatch]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleUpdateUser = () => {
    if (!nameUser.trim()) {
      Swal.fire("Error", "The name field cannot be empty.", "error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailUser)) {
      Swal.fire("Error", "Please enter a valid email address.", "error");
      return;
    }
    const userData = {
      _id: idUser,
      name: nameUser,
      email: emailUser,
    };
    dispatch(updateDataUser(userData));
  };

  return (
    <>
      <div className="row mb-3 text-md-center">
        <div className="card">
          <div className="card-header">
            <h3>User Profile <FaUserCheck /></h3>
          </div>
          <div className="card-body">
            <div className="col-md-6 mb-3 d-flex">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleShowModal}
              >
                Change Password <FaKey />
              </button>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-3">
                <h5>Name</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaUser className="iconSize" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name of User"
                    value={nameUser}
                    onChange={(e) => handleInputChangeWithDispatch(e, SetNameUser)}
                  />
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <h5>E-Mail</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaEnvelope className="iconSize" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="E-Mail of User"
                    value={emailUser}
                    onChange={(e) => handleInputChangeWithDispatch(e, SetEmailUser)}
                  />
                </div>
              </div>
              <hr />
              <center>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUpdateUser}
                >
                  Save Changes <FaFloppyDisk />
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ProfilePasswordModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default ProfileBody;
