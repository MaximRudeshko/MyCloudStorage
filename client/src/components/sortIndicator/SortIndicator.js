import React from 'react';
import arrow from '../../assets/img/down-arrow.svg'

import './sortIndicator.scss'

const SortIndicator = () => {
    return (
        <div className = 'sort-indicator'>
            <img src = {arrow} alt = 'arrow'/>
            <div className = 'sort-indicator__lines'>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default SortIndicator;
