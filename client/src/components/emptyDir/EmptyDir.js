import React from 'react';
import emptySvg from '../../assets/img/empty-box.svg'

import './emptyDir.scss'

const EmptyDir = () => {
    return (
        <div className = 'disk__empty'>
            <div>
                <img src = {emptySvg} alt = 'empty-svg'/>
                <p className = 'disk__empty-label'>Пустая папка</p>
            </div>
        </div>
    );
}

export default EmptyDir;
