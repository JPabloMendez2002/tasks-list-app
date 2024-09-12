import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetEmailUser, SetNameUser, SetPasswordUser, startLogin, startRegister } from '../actions/ProfileAction';
import Swal from 'sweetalert2';
import { Footer } from './General/Footer';
import { FaEnvelope, FaFloppyDisk, FaKey, FaUser, FaUserPlus } from 'react-icons/fa6';
import { BiLogInCircle } from "react-icons/bi";
import { FaExchangeAlt } from 'react-icons/fa';

const LoginPage = () => {
    const { nameUser, emailUser, passwordUser } = useSelector(state => state.stateProfile);
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleAuth = async () => {
        if (!emailUser || !passwordUser || (!isLogin && !nameUser)) {
            Swal.fire('Error', 'Please fill all fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailUser)) {
            Swal.fire("Error", "Please enter a valid email address.", "error");
            return;
        }

        if (isLogin) {

            const userData = {
                email: emailUser,
                password: passwordUser
            };
            dispatch(startLogin(userData)).then(response => {
                if (response) {
                    navigate('/home');
                }
            });
        } else {
            const userData = {
                name: nameUser,
                email: emailUser,
                password: passwordUser
            };

            dispatch(startRegister(userData)).then(response => {
                if (response) {
                    navigate('/home');
                }
            });
        }
    };

    return (
        <>
            <hr />
            <div className="container d-flex justify-content-center align-items-center">
                <div className={`card p-4 shadow-lg ${isLogin ? 'login-card' : 'register-card'}`}>
                    <h2 className="text-center mb-4">
                        {isLogin
                            ?
                            <>
                                Login <FaUser />
                            </>
                            :
                            <>
                                Register <FaUserPlus />
                            </>
                        }

                    </h2>
                    <form>
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaEnvelope className="iconSize" />
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={emailUser}
                                    onChange={(e) => handleInputChangeWithDispatch(e, SetEmailUser)}
                                />
                            </div>
                        </div>
                        {!isLogin && (
                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaUser className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={nameUser}
                                        onChange={(e) => handleInputChangeWithDispatch(e, SetNameUser)}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaKey className="iconSize" />
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={passwordUser}
                                    onChange={(e) => handleInputChangeWithDispatch(e, SetPasswordUser)}
                                />
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary w-100" onClick={handleAuth}>
                            {isLogin ?
                                <>
                                    Login <BiLogInCircle className='iconSize' />
                                </>
                                :
                                <>
                                    Register <FaFloppyDisk className='iconSize' />
                                </>
                            }
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <button
                            className="btn btn-dark"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ?
                                <>
                                    Switch to Register <FaExchangeAlt />
                                </>
                                :
                                <>
                                    Switch to Login <FaExchangeAlt />
                                </>
                            }
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;
