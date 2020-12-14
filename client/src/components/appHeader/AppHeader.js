import React from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { logOut , deleteAvatar} from '../../redux/actions/user';
import {uploadAvatar} from '../../redux/actions/user'

import logo from '../../assets/img/app-logo.svg'
import userLogo from '../../assets/img/user-logo.svg'
import './appHeader.scss'
import UserDetails from '../user-details/UserDetails';


const AppHeader = () => {

    const {isAuth, currentUser} = useSelector(state => state.user)
    const avatar = currentUser.avatar ? `http://localhost:5001/${currentUser.avatar}` : userLogo
    const dispatch = useDispatch()
    const fileInput = React.useRef(null)
    const [popupVisible, setPopupVisisble] = React.useState(false)

    const changeInputHandler = e => {
        e.stopPropagation()
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
        e.target.value = ''
    }

    const openPopupHandler = (e) => {
        if(popupVisible === false){
            setPopupVisisble(true)
        }else{
            setPopupVisisble(false)
        }
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
                                <img onClick = {openPopupHandler} src = {avatar} alt ='user logo'/>
                                {
                                    popupVisible && <UserDetails avatar = {avatar} changeInputHandler = {changeInputHandler}/>
                                }
                            </li>}                            
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
