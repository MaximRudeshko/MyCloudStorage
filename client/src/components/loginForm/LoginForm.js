import React from 'react';
import { Input } from '../input';

import './loginForm.scss'

const LoginForm = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <div className = 'auth__login'>
            <p>Авторизация</p>
            <Input setValue= {setEmail} value = {email} placeholder = 'Введите адрес электронной почты...'/>
            <Input setValue= {setPassword} value = {password} placeholder = 'Введите пароль...'/>
            <button type = 'submit'>Войти</button>
        </div>
    );
}

export default LoginForm;
