import React from 'react';

import {registration} from '../../redux/actions/user';
import { Button } from '../button';
import { Input } from '../input';

import './registerForm.scss'

const RegisterForm = () => {

    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <div className = 'auth__register'>
            <p>Регистрация</p>
            <Input setValue = {setName} value = {name} placeholder = 'Введите имя...' type = 'text'/>
            <Input setValue = {setLastName} value = {lastName} placeholder = 'Введите фамилию...' type = 'text'/>
            <Input setValue = {setEmail} value = {email} placeholder = 'Введите адрес электронной почты...' type = 'text'/>
            <Input setValue = {setPassword} value = {password} placeholder = 'Введите пароль...' type = 'password'/>
            <Button text = 'Зарегистрироваться' onClick = {() => registration(email, password, name, lastName)} />
        </div>
    );
}

export default RegisterForm;
