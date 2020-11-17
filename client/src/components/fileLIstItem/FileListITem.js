import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import folder from '../../assets/img/dir.svg'
import fileSvg from '../../assets/img/file.svg'
import { pushToStack, setCurrentDir } from '../../redux/actions/files';

import './fileListItem.scss'

const FileListITem = ({file}) => {
    console.log(file)

    const dispatch = useDispatch()
    const {currentDirectory} = useSelector(state => state.files)

    const openDirHandler = () => {
        dispatch(pushToStack(currentDirectory))
        dispatch(setCurrentDir(file._id))
        
    }

    return (
        <div className = 'file' onClick = {file.type === 'dir' ? openDirHandler : ''}>
            <img src = {file.type === 'dir' ? folder : fileSvg } alt = 'file-pic' className = 'file__img' />
            <div className = 'file__name'>{file.name}</div>
            <div className = 'file__date'>{file.date.slice(0, 10)}</div>
            <div className = 'file__size'>{file.size}</div>
        </div>
    );
}

export default FileListITem;
