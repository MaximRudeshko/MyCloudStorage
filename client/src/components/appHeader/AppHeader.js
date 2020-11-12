import React from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import logo from '../../assets/img/app-logo.svg'
import './appHeader.scss'
import { logOut } from '../../redux/actions/user';

const AppHeader = () => {

    const {isAuth} = useSelector(state => state.user)

    const dispatch = useDispatch()

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
                            {isAuth && <li><a onClick = {() => dispatch(logOut())}>Выйти</a></li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
