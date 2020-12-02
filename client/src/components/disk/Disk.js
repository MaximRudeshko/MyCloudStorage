import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, searchFiles, setCurrentDir, setPopupVisible, uploadFile } from '../../redux/actions/files'
import  FileList  from '../fileList';
import arrowBack from '../../assets/img/back-arrow.svg'
import grid2 from '../../assets/img/grid2.svg'
import grid2grey from '../../assets/img/grid2-active.svg'
import grid3 from '../../assets/img/grid3.svg'
import grid3blue from '../../assets/img/grid3-active.svg'

import './disk.scss'
import SortIndicator from '../sortIndicator/SortIndicator';
import Popup from '../popup/Popup';
import { EmptyDir } from '../emptyDir';
import Uploader from '../uploader/Uploader';
import Loader from '../loader/Loader';
import { setView } from '../../redux/actions/user';



const Disk = () => {

    const dispatch = useDispatch()
    const {files, currentDirectory, dirStack} = useSelector(state => state.files)
    const {loading} = useSelector(state => state.loader)
    const {isVisible} = useSelector(state => state.uploader)
    const {view} = useSelector(state => state.user)
    const [dragEnter, setDragEnter] = React.useState(false) 
    const [sort, setSort] = React.useState('date')
    const [search, setSearch] = React.useState('')
    const [searchTimeout, setSearchTimeout] = React.useState(false)

    React.useEffect(() => {
      dispatch(fetchFiles(currentDirectory, sort))
    }, [currentDirectory, sort])

    console.log(sort)

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

    const searchChangeHandler = (e) => {
        setSearch(e.target.value)
        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }
        if(e.target.value != '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(fetchFiles(currentDirectory, sort))
        }
    }

    if(loading){
        return <Loader/>
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
                <input value = {search} onChange = {e => searchChangeHandler(e)} placeholder = 'Введите название файла...'/> 
                <div className = 'disk__actions-right'>
                    <SortIndicator/>
                    <select value = {sort} onChange = {e => setSort(e.target.value)}>
                        <option value = 'type'>По типу</option>
                        <option value = 'date'>По дате</option>
                        <option value = 'name'>По названию</option>
                    </select>
                    <div className = 'disk__actions-grids'>
                        <img onClick = {() => dispatch(setView('plate'))} src = {view === 'plate' ? grid2 : grid2grey} alt = 'grid'/>
                        <img onClick = {() => dispatch(setView('list'))} src = {view === 'list' ? grid3blue : grid3} alt = 'grid'/>
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
