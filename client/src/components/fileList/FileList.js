import React from 'react';
import { useSelector } from 'react-redux';
import FileListItem from '../fileLIstItem/FileListITem';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Scrollbars} from 'react-custom-scrollbars'

import './fileList.scss'

const FileList = () => {


    const files = useSelector(state => state.files.files)  
    return ( 
        <Scrollbars autoHide>
        <div className = 'filelist__wrapper'>
            <div className = 'filelist'>
                <div className = 'filelist__header'>
                    <div className="filelist__name">Название</div>
                    <div className="filelist__date">Дата</div>
                    <div className="filelist__size">Размер</div>
                </div>
                
                <TransitionGroup>
                    {files.map(file =>
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            classNames={'file'}
                            exit={false}
                        >
                            <FileListItem file={file}/>
                        </CSSTransition>
                    )}
                </TransitionGroup>
                
            </div>
        </div>
        </Scrollbars>
    );
}

export default FileList;
