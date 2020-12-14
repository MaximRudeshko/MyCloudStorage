import React from 'react';
import { useSelector } from 'react-redux';
import FileListItem from '../fileLIstItem/FileListITem';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Scrollbars} from 'react-custom-scrollbars'

import './fileList.scss'

const FileList = () => {
    const files = useSelector(state => state.files.files)  
    const {view} = useSelector(state => state.user)
    console.log(files)

    if(view === 'list'){
        return ( 
            <Scrollbars autoHide>
            <div className = 'filelist__wrapper'>
                <div className = 'filelist'>
                    <div className = 'filelist__header'>
                        <div className="filelist__name">Название</div>
                        <div className="filelist__date">Дата</div>
                        <div className="filelist__size">Размер</div>
                    </div>
                    <div className = 'filelist__items'>
                        {files.map(file =>
                                <FileListItem key = {''} file={file}/>
                        )}  
                    </div>
                </div>
            </div>
            </Scrollbars>
        );
    }

    if(view === 'plate'){
        return ( 
            <Scrollbars autoHide>
            <div className = 'filelist__wrapper'>
                <div className = 'filelist'>
                    <div className = 'filelist-plate__items'>
                        {files.map(file =>
                                <FileListItem file={file}/>
                        )}
                    </div>
                </div>
            </div>
            </Scrollbars>
        );
    }
}

export default FileList;
