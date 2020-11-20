import React from 'react';
import './input.scss'

const Input = ({setValue, value, placeholder, type}) => {
    return (
        <input onChange = {(e) => setValue(e.target.value)} value = {value} placeholder = {placeholder} type = {type}/>
    );
}

export default Input;
