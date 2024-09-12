import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaExchangeAlt, FaEye, FaEyeSlash, FaKey, FaRandom } from 'react-icons/fa';
import { SetNewPasswordUser, SetPasswordUser, updatePasswordUser } from "../../actions/ProfileAction";
import Swal from "sweetalert2";

const ProfilePasswordModal = ({ showModal, handleCloseModal }) => {
  const dispatch = useDispatch();
  const { newPasswordUser, passwordUser } = useSelector(state => state.stateProfile);

  const handleUpdatePassword = () => {
    if (!passwordUser || !newPasswordUser || !repeatPassword) {
      Swal.fire("Error", "All fields are required.", "error");
      return;
    }
    if (!passwordsMatch) {
      Swal.fire("Error", "The passwords do not match.", "error");
      return;
    }
    if (!passwordValid) {
      Swal.fire("Error", "The new password does not meet the requirements.", "error");
      return;
    }

    const userPasswords = {
      newPassword: newPasswordUser,
      currentPassword: passwordUser,
    };
    dispatch(updatePasswordUser(userPasswords));
  };

  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showLastPassword, setShowLastPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    dispatch(SetNewPasswordUser(value));
    validatePassword(value);
  };

  const handleRepeatPasswordChange = (e) => {
    const value = e.target.value;
    setRepeatPassword(value);
    setPasswordsMatch(newPasswordUser === value);
  };

  const handleLastPasswordChange = (e) => {
    dispatch(SetPasswordUser(e.target.value));
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    setPasswordValid(regex.test(value));
  };

  const togglePasswordVisibility = (type) => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    } else if (type === 'repeatPassword') {
      setShowRepeatPassword(!showRepeatPassword);
    } else if (type === 'lastPassword') {
      setShowLastPassword(!showLastPassword);
    }
  };

  const generateRandomPassword = () => {
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const charset = lowerCase + upperCase + numbers;

    let randomPassword = "";
    randomPassword += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    randomPassword += upperCase[Math.floor(Math.random() * upperCase.length)];
    randomPassword += numbers[Math.floor(Math.random() * numbers.length)];

    for (let i = 3; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomPassword += charset[randomIndex];
    }

    dispatch(SetNewPasswordUser(randomPassword)); 
    setRepeatPassword('');
    validatePassword(randomPassword);
    setPasswordsMatch(false);
  };

  if (!showModal) return null; 

  return (
    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="passwordModalLabel">Update Password <FaExchangeAlt /></h5>
            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-3 mb-3"></div>
              <div className="col-md-6 mb-3">
                <h5>Last Password</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaKey />
                  </span>
                  <input
                    type={showLastPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Last Password"
                    id="lastpassword"
                    name="lastpassword"
                    value={passwordUser}
                    onChange={handleLastPasswordChange}
                  />
                  <button
                    type="button"
                    className={`btn ${showLastPassword ? 'btn-secondary' : 'btn-outline-dark'}`}
                    onClick={() => togglePasswordVisibility('lastPassword')}
                  >
                    {showLastPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="col-md-3 mb-3"></div>
            </div>
            <hr />
            <form id="formcontraAe" name="formcontraAe">
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <h5>New Password</h5>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaKey />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${passwordValid ? 'is-valid' : 'is-invalid'}`}
                      placeholder="New Password"
                      id="password"
                      name="password"
                      value={newPasswordUser}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      className={`btn ${showPassword ? 'btn-secondary' : 'btn-outline-dark'}`}
                      onClick={() => togglePasswordVisibility('password')}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={generateRandomPassword}
                    >
                      <FaRandom />
                    </button>
                  </div>
                  <small className="form-text text-muted">
                    The password must contain at least one uppercase letter, one lowercase letter, and a number.
                  </small>
                </div>

                <div className="col-md-6 mb-3">
                  <h5>Repeat Password</h5>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaKey />
                    </span>
                    <input
                      type={showRepeatPassword ? 'text' : 'password'}
                      className={`form-control ${passwordsMatch ? 'is-valid' : 'is-invalid'}`}
                      placeholder="Repeat Password"
                      id="repeatpassword"
                      name="repeatpassword"
                      value={repeatPassword}
                      onChange={handleRepeatPasswordChange}
                    />
                    <button
                      type="button"
                      className={`btn ${showRepeatPassword ? 'btn-secondary' : 'btn-outline-dark'}`}
                      onClick={() => togglePasswordVisibility('repeatPassword')}
                    >
                      {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {!passwordsMatch && (
                    <small className="form-text text-danger">
                      The passwords do not match.
                    </small>
                  )}
                </div>
              </div>
              <hr />
              <center>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUpdatePassword}
                >
                  Save Changes
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePasswordModal;
