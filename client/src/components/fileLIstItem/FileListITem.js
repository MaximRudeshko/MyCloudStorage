import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import folder from '../../assets/img/dir.svg'
import fileSvg from '../../assets/img/file.svg'
import { deleteFile, downloadFile, pushToStack, setCurrentDir } from '../../redux/actions/files';

import downloadSvg from '../../assets/img/download.svg'
import trashSvg from '../../assets/img/trash.svg'

import './fileListItem.scss'
import { removeFileFRomUploader } from '../../redux/actions/uploader';
import sizeFormat from '../../utils/sizeFormat';

const FileListITem = ({file}) => {
    const dispatch = useDispatch()
    const {currentDirectory} = useSelector(state => state.files)
    const {view} = useSelector(state => state.user)

    const openDirHandler = () => {
        dispatch(pushToStack(currentDirectory))
        dispatch(setCurrentDir(file._id))
    }

    const downloadFileHandler = (event) => {
        event.stopPropagation()
        downloadFile(file)

    }

    const deleteFileHandler = (event) => {
        event.stopPropagation()
        dispatch(deleteFile(file))
        dispatch(removeFileFRomUploader(file))
    }

    if(view === 'list'){
        return (
            <div className = 'file' onClick = {file.type === 'dir' ? openDirHandler : null}>
                <img src = {file.type === 'dir' ? folder : fileSvg } alt = 'file-pic' className = 'file__img' />
                <div className = 'file__name'>{file.name}</div>
                <div className = 'file__date'>{file.date.slice(0, 10)}</div>
                <div className = 'file__size'>{sizeFormat(file.size)}</div>
                {file.type !== 'dir' && <img src = {downloadSvg}  onClick = {e =>downloadFileHandler(e)} alt = 'download' className = 'file__btn'/>}
                <img src = {trashSvg} onClick = {e => deleteFileHandler(e)} alt = 'trash' className = 'file__btn'/>
            </div>
        );
    }

    if(view === 'plate'){
        return (
            <div className = 'file-plate' onClick = {file.type === 'dir' ? openDirHandler : null}>
                <img src = {file.type === 'dir' ? folder : fileSvg } alt = 'file-pic' className = 'file__img' />
                <div className = 'file-plate__name'>{file.name}</div>
                {file.type !== 'dir' && <img src = {downloadSvg}  onClick = {e =>downloadFileHandler(e)} alt = 'download' className = 'file__btn'/>}
                <img src = {trashSvg} onClick = {e => deleteFileHandler(e)} alt = 'trash' className = 'file__btn'/>
            </div>
        );
    }
}

export default FileListITem;
