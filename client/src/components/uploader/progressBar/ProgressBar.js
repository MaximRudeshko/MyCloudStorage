import React from 'react';

import './progressBar.scss'

const ProgressBar = ({progress}) => {
    return (
        <div className="progress progress-striped" >
            <div className="progress-bar" style = {{width : progress + '%'}}>
                <div className = 'progress-percents'>{progress}%</div>
            </div>                       
        </div> 
    );
}

export default ProgressBar;
