import React from 'react';
import FileListITem from '../fileLIstItem/FileListITem';

import './fileList.scss'

const FileList = ({files}) => {

    
    return (
        <div className = 'filelist'>
            <div className = 'filelist__header'>
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            {
                files.map(file => <FileListITem file = {file}/>)
            }
        </div>
    );
}

export default FileList;
