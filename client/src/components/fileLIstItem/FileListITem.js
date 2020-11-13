import React from 'react';
import folder from '../../assets/img/dir.svg'
import fileSvg from '../../assets/img/file.svg'

import './fileListItem.scss'

const FileListITem = ({file}) => {
    return (
        <div className = 'file'>
            <img src = {file.type === 'dir' ? folder : fileSvg } alt = 'file-pic' className = 'file__img' />
            <div className = 'file__name'>{file.name}</div>
            <div className = 'file__date'>{file.date.slice(0, 10)}</div>
            <div className = 'file__size'>{file.size}</div>
        </div>
    );
}

export default FileListITem;
