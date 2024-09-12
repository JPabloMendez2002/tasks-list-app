import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { SetCurrentTab } from '../actions/HomeAction';
import { TaskPage } from './TasksPage/TaskPage';
import { ProfilePage } from './ProfilePage/ProfilePage';
import { Footer } from './General/Footer';
import { ReactComponent as ImgHome } from '../assets/img/home.svg';
import { FaBars, FaCaretDown, FaHouse,FaNoteSticky, FaUser } from 'react-icons/fa6';
import { FaSignInAlt } from 'react-icons/fa';
import { startLogout } from '../actions/ProfileAction';
export const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentTabInventory } = useSelector(
        (state) => state.stateHome
    );

    const handleChangeTab = (nameTab) => {
        dispatch(SetCurrentTab(nameTab))
    }

    const handleLogout = () => {
        dispatch(startLogout());
        navigate('/login');
    };
    const renderContent = () => {
        switch (currentTabInventory) {
            case 'HomePage':
                return <HomeBody />;
            case 'TaskPage':
                return <TaskPage />;
            case 'ProfilePage':
                return <ProfilePage />;
            default:
                return <HomeBody />;
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-white">Tasks-List App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <FaBars className='text-white' />
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <hr />
                        <ul className="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item mb-2 ms-2">
                                <button className="btn btn-secondary" onClick={e => { handleChangeTab('HomePage') }} ><FaHouse /> Home</button>
                            </li>
                            <li className="nav-item mb-2 ms-2">
                                <button className="btn btn-secondary" onClick={e => { handleChangeTab('TaskPage') }} ><FaNoteSticky /> Tasks</button>
                            </li>
                        </ul>

                        <span className="navbar-text me-2">
                            <div className="dropdown">
                                <button type="button" className="btn btn-secondary" data-bs-toggle="dropdown">
                                    Users Options <FaCaretDown />
                                </button>
                                <ul className="dropdown-menu">
                                    <center>
                                        <li>
                                            <a className="dropdown-item">
                                                <button className='btn btn-primary' onClick={e => { handleChangeTab('ProfilePage') }}>Edit Profile <FaUser /> </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item">
                                                <button className='btn btn-danger' onClick={handleLogout}>Log Out <FaSignInAlt /> </button>
                                            </a>
                                        </li>
                                    </center>
                                </ul>
                            </div>
                        </span>
                    </div>
                </div>
            </nav>

            {renderContent()}
            <Footer />
        </>
    )
}

export const HomeBody = () => {
    const dispatch = useDispatch();
    const handleChangeTab = (nameTab) => {
        dispatch(SetCurrentTab(nameTab))
    }
    return (
        <>
            <div className="container mt-3 text-center">
                <div className="row mb-3">
                    <div className="mt-4 p-5 bg-white text-dark rounded">
                        <ImgHome className="image-home" />
                        <hr />
                        <h2>¡Welcome to the Tasks-List App! 🎉</h2>
                        <br />
                        <button className='btn btn-dark' onClick={e => { handleChangeTab('TaskPage') }}>Star Now <FaNoteSticky className='iconSize' /></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;