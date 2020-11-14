import React from 'react';
import { useDispatch } from 'react-redux';
import { onLogin} from '../../redux/actions/user';
import { Input } from '../input';

import './loginForm.scss'

const LoginForm = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const dispatch = useDispatch()

    

    return (
        <div className = 'auth__login'>
            <p>Авторизация</p>
            <Input setValue= {setEmail} value = {email} placeholder = 'Введите адрес электронной почты...'/>
            <Input setValue= {setPassword} value = {password} placeholder = 'Введите пароль...'/>
            <button onClick = {() => dispatch(onLogin(email, password))}>Войти</button>
        </div>
    );
}

export default LoginForm;
