import React from 'react';

import './uploaderItem.scss'
import close from '../../../assets/img/cancel.svg'

const UploaderItem = ({file}) => {
    return (
        <div className = 'uploader-item'>
            <div className = 'uploader-item__header'>
                <p className = 'uploader-item__name'>
                    {file.name}
                </p>
                <img src = {close} alt = 'close svg'/>
            </div>
            <div className = 'uploader-item__progress-bar'>
                <div className = 'uploader-item__upload-bar' style = {{width: file.progress + '%'}}></div>
                <div className = 'uploader-item__percent'>{file.progress}%</div>
            </div>
        </div>
    );
}

export default UploaderItem;
