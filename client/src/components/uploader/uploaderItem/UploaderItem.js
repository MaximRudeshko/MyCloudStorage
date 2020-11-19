import React from 'react';

import './uploaderItem.scss'
import close from '../../../assets/img/cancel.svg'
import ProgressBar from '../progressBar/ProgressBar';
import { useDispatch } from 'react-redux';
import { removeFileFRomUploader } from '../../../redux/actions/uploader';

const UploaderItem = ({file}) => {

    const dispatch = useDispatch()

    const closeClickHandler = () => {
       dispatch(removeFileFRomUploader(file))
    }


    return (
        <div className = 'uploader-item'>
            <div className = 'uploader-item__header'>
                <p className = 'uploader-item__name'>
                    {file.name}
                </p>
                <img onClick = {closeClickHandler} src = {close} alt = 'close svg'/>
            </div>
            <ProgressBar progress = {file.progress}/>
        </div>
    );
}

export default UploaderItem;
