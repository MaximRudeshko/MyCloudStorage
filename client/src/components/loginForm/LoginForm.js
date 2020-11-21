import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin} from '../../redux/actions/user';
import { Button } from '../button';
import { Input } from '../input';
import Loader from '../loader/Loader';

import './loginForm.scss'

const LoginForm = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const {loading} = useSelector(state => state.loader)

    const dispatch = useDispatch()

    if(loading){
        return <Loader/>
    }

    return (
        <div className = 'auth__login'>
            <p>Авторизация</p>
            <Input setValue= {setEmail} value = {email} placeholder = 'Введите адрес электронной почты...'/>
            <Input setValue= {setPassword} value = {password} placeholder = 'Введите пароль...'/>
            <Button text = 'Войти' onClick = {() => dispatch(onLogin(email, password))} />
        </div>
    );
}

export default LoginForm;
