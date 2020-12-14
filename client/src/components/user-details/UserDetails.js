import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvatar, logOut } from '../../redux/actions/user';
import sizeFormat from '../../utils/sizeFormat'
import Button from '../button/Button';

import trash from '../../assets/img/trash.svg'


import './userDetails.scss'

const UserDetails = ({avatar, changeInputHandler}) => {

    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const { email, lastName, name, usedSpace, diskSpace} = currentUser
    

    const deleteAvatarHandler = e => {
        e.preventDefault()
        dispatch(deleteAvatar())
    }

    return (
        <div className = 'user-details'>
            <div className = 'user-details__header'>
                <div className = 'user-details__avatar'>
                    <label style = {{backgroundImage: `url(${avatar})`}} htmlFor = 'input'>
                        <div onClick = {e => deleteAvatarHandler(e)} className = 'user-details__delete'>
                            <img src = {trash}/>
                        </div>
                    </label>
                    <input onChange = {changeInputHandler} type = 'file' id = 'input' />
                    
                </div>
                <div className = 'user-details__info'>
                    <h2>{name + ' ' + lastName}</h2>
                    <p>{email}</p>
                </div>
            </div>
            <div className = 'user-details__body'>
                <p>Места на диске: {sizeFormat(diskSpace - usedSpace)}</p>
            </div>
            <Button text = 'Выйти' onClick = {() => dispatch(logOut())}/>
        </div>
    );
}

export default UserDetails;
