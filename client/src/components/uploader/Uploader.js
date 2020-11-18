import React from 'react';
import UploaderItem from './uploaderItem/UploaderItem';

import './uploader.scss'
import { useDispatch, useSelector } from 'react-redux';
import { hideUploader } from '../../redux/actions/uploader';
import close from '../../assets/img/cancel.svg'

const Uploader = () => {

    const {files} = useSelector(state => state.uploader)
    const dispatch = useDispatch()

    const hideUploaderHandler = () => {
        dispatch(hideUploader())
    }

    return (
        <div className = 'uploader'>
            <div className = 'uploader__header'>
                <div className = 'uploader__title'>Загрузки</div>
                <img src = {close} alt = 'close svg'/>
            </div>
            <div className = 'uploader__items'>
                    {
                        files.map((file) => <UploaderItem file = {file}/>)
                    }
            </div>
        </div>
    );
}

export default Uploader;
