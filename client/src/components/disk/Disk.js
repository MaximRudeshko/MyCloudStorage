import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFile, fetchFiles } from '../../redux/actions/files'
import  FileList  from '../fileList';
import arrowBack from '../../assets/img/back-arrow.svg'
import arrowDown from '../../assets/img/arrow-down.svg'
import grid1 from '../../assets/img/grid1.svg'
import grid2 from '../../assets/img/grid2.svg'
import grid3 from '../../assets/img/grid3.svg'

import './disk.scss'
import SortIndicator from '../sortIndicator/SortIndicator';


const Disk = () => {

    const dispatch = useDispatch()
    const {currentDirectory, files} = useSelector(state => state.files)
 

    React.useEffect(() => {
      dispatch(fetchFiles(currentDirectory))
    }, [currentDirectory])
    


    return (
        <div className = 'disk'>
            <h2 className = 'disk__category'>Category</h2>
            <div className = 'disk__actions'>
                <div className = 'disk__actions-left'>
                    <div className = 'disk__actions-back'>
                        <img src = {arrowBack} alt = 'arrow back'/>
                    </div>
                    <div onClick = {() => dispatch(createFile('1234', 'dir'))} className = 'disk__actions-create'>
                        Создать новую папку
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
            <FileList files = {files}/>
        </div>
    );
}

export default Disk;
