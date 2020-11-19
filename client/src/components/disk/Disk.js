import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, setCurrentDir, setPopupVisible, uploadFile } from '../../redux/actions/files'
import  FileList  from '../fileList';
import arrowBack from '../../assets/img/back-arrow.svg'
import arrowDown from '../../assets/img/arrow-down.svg'
import grid1 from '../../assets/img/grid1.svg'
import grid2 from '../../assets/img/grid2.svg'
import grid3 from '../../assets/img/grid3.svg'

import './disk.scss'
import SortIndicator from '../sortIndicator/SortIndicator';
import Popup from '../popup/Popup';
import { EmptyDir } from '../emptyDir';
import Uploader from '../uploader/Uploader';


const Disk = () => {

    const dispatch = useDispatch()
    const {files, currentDirectory, dirStack} = useSelector(state => state.files)
    const {isVisible} = useSelector(state => state.uploader)
    const [dragEnter, setDragEnter] = React.useState(false) 

    React.useEffect(() => {
      dispatch(fetchFiles(currentDirectory))
    }, [currentDirectory])


    const backDirHandler = () => {
        const dirId = dirStack.pop();
        dispatch(setCurrentDir(dirId))
    }

    const uploadFilesHandler = (event) => {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDirectory)))
    }

    const dragEnterHandler = event => {
        event.stopPropagation()
        event.preventDefault()
        setDragEnter(true)
    }

    const dragLeaveHandler = event => {
        event.stopPropagation()
        event.preventDefault()
        setDragEnter(false)
    }

    const dropHandler = event => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
        const files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDirectory)))
    }

    return (!dragEnter ?   
        <div className = 'disk' onDragEnter = {dragEnterHandler} onDragLeave= { dragLeaveHandler} onDragOver = {dragEnterHandler}>
            <h2 className = 'disk__category'>Category</h2>
            <div className = 'disk__actions'>
                <div className = 'disk__actions-left'>
                    <div className = 'disk__actions-btns'>
                        {currentDirectory && 
                            <div 
                                onClick = {() => backDirHandler() }
                                className = 'disk__actions-back'>
                                    <img src = {arrowBack} alt = 'arrow back'/>
                            </div>  
                        }
                        <div onClick = {() => dispatch(setPopupVisible(true))} className = 'disk__actions-create'>
                            Создать новую папку
                        </div>
                    </div>
                    <div className = 'disk__actions-upload'>
                        <label className = 'disk__actions-upload-label' htmlFor = 'disk-input'>Загрузить файл</label>
                        <input onChange = {event => uploadFilesHandler(event)} multiple = {true} className = 'disk__actions-upload-input' type = 'file' id = 'disk-input'/>
                    </div>
                </div>
                <div className = 'disk__actions-right'>
                    <SortIndicator/>
                    <div className = 'disk__actions-sorting'>
                        <span>Name</span>
                        <img src = {arrowDown} alt = 'arrow-down'/>
                    </div>
                    <div className = 'disk__actions-grids'>
                        <img src = {grid1} alt = 'grid'/>
                        <img src = {grid2} alt = 'grid'/>
                        <img src = {grid3} alt = 'grid'/>
                    </div>
                </div>
            </div>
            {files.length > 0 ? <FileList/> : <EmptyDir/>}
            <Popup/>
            {isVisible && <Uploader/>}
        </div>
        : 
        <div 
            className = 'disk__drop-area' 
            onDrop = {dropHandler} 
            onDragEnter = {dragEnterHandler} 
            onDragLeave= { dragLeaveHandler} 
            onDragOver = {dragEnterHandler}>
                Перетащите файлы сюда
        </div>
    );
}

export default Disk;
