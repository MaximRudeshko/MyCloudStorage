import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/img/app-logo.svg'
import './appHeader.scss'

const AppHeader = () => {
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
                            <li>
                                <NavLink to = '/login'>Войти</NavLink>
                            </li>
                            <li>
                                <NavLink to = '/register'>Зарегистрироваться</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
