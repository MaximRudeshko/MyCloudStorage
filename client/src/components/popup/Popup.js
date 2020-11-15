import React, { useImperativeHandle } from 'react';
import { Button } from '../button';
import {Input} from '../input'
import close from '../../assets/img/cancel.svg'

import './popup.scss'
import { useDispatch, useSelector } from 'react-redux';
import { createFile, setPopupVisible } from '../../redux/actions/files';

const Popup = () => {

    const [dirName, setDirName] = React.useState('')

    const {isPopupVisible, currentDirectory} = useSelector(state => state.files)
    const dispatch = useDispatch()

    const popupCloseClickHandler = (dirName, currentDirectory) => {
        dispatch(createFile(dirName, currentDirectory))
        dispatch(setPopupVisible(false))
        setDirName('')
    }

    return (
        <div 
            className = {`popup ${isPopupVisible ? 'popup-visible' : 'popup-hidden'}`}
            onClick = {() => dispatch(setPopupVisible(false))}
        >
            <div className = 'popup__content' onClick = {(e) => e.stopPropagation()}>
                <div className = 'popup__header'>
                    <p className = 'popup__title'>
                        Создать новую папку
                    </p>
                    <img 
                        src = {close} 
                        alt = 'çlose svg'
                        onClick = {() => dispatch(setPopupVisible(false))}
                    />
                </div>
                <Input setValue = {setDirName} value = {dirName} placeholder = 'Введите название папки ...' type = 'text'/>
                <Button 
                    text = 'Создать'
                    onClick = {() => popupCloseClickHandler(dirName, currentDirectory)}
                />
            </div>
        </div>
    );
}

export default Popup;
