import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFile, fetchFiles, setCurrentDir, setPopupVisible, uploadFile } from '../../redux/actions/files'
import  FileList  from '../fileList';
import arrowBack from '../../assets/img/back-arrow.svg'
import arrowDown from '../../assets/img/arrow-down.svg'
import grid1 from '../../assets/img/grid1.svg'
import grid2 from '../../assets/img/grid2.svg'
import grid3 from '../../assets/img/grid3.svg'

import './disk.scss'
import SortIndicator from '../sortIndicator/SortIndicator';
import Popup from '../popup/Popup';


const Disk = () => {

    const dispatch = useDispatch()
    const {currentDirectory, dirStack} = useSelector(state => state.files)
 

    React.useEffect(() => {
      dispatch(fetchFiles(currentDirectory))
    }, [currentDirectory])


   function backDirHandler () {
        const dirId = dirStack.pop();
        dispatch(setCurrentDir(dirId))
    }


    const uploadFilesHandler = (event) => {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDirectory)))
    }
    


    return (
        <div className = 'disk'>
            <h2 className = 'disk__category'>Category</h2>
            <div className = 'disk__actions'>
                <div className = 'disk__actions-left'>
                    <div 
                        onClick = {() => backDirHandler() }
                        className = 'disk__actions-back'>
                            <img src = {arrowBack} alt = 'arrow back'/>
                    </div>
                    <div onClick = {() => dispatch(setPopupVisible(true))} className = 'disk__actions-create'>
                        Создать новую папку
                    </div>
                    <div className = 'disk__action-upload'>
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
            <FileList/>
            <Popup/>
        </div>
    );
}

export default Disk;
