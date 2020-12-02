import React from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { deleteAvatar, logOut } from '../../redux/actions/user';
import {uploadAvatar} from '../../redux/actions/user'

import logo from '../../assets/img/app-logo.svg'
import userLogo from '../../assets/img/user-logo.svg'
import './appHeader.scss'


const AppHeader = () => {

    const {isAuth, currentUser} = useSelector(state => state.user)
    const avatar = currentUser.avatar ? `http://localhost:5001/${currentUser.avatar}` : userLogo
    
    console.log(currentUser.avatar)
    const dispatch = useDispatch()

    const changeInputHandler = e => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }
    

    return (
        <header className = 'header'>
            <div className = 'container'>
                <div className ='header__wrapper'>
                    <div className = 'header__logo'>
                        <img src = {logo} alt = 'app-logo'/>
                        <span>Cloud App</span>
                    </div>
                    <nav className = 'header__nav'>
                        <ul>
                            {!isAuth && <li><NavLink to = '/login'>Войти</NavLink></li>}
                            {!isAuth && <li><NavLink to = '/register'>Зарегистрироваться</NavLink></li>}
                            {isAuth && <li className = 'header__nav-user'>
                                <img src = {avatar} alt ='user logo'/>
                                <a onClick = {() => dispatch(logOut())}>Выйти</a>
                            </li>}
                            <input type = 'file' onChange = {e => changeInputHandler(e)}/>
                            <button onClick = {() => dispatch(deleteAvatar())}></button>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
