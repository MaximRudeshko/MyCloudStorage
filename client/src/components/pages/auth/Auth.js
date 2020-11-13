import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {RegisterForm} from '../../registerForm'
import {LoginForm} from '../../loginForm'

import './auth.scss'
import { useDispatch, useSelector } from 'react-redux';
import { onAuth } from '../../../redux/actions/user';

const Auth = () => {

    const {isAuth} = useSelector(state => state.user)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(onAuth())
    }, [])
    
    return (
        <div className = 'auth'>
            {!isAuth && 
                <Switch>
                    <Route path = {['/login', '/']} component = {LoginForm} exact/>
                    <Route path = '/register' component = {RegisterForm}/>
                </Switch>
            }
        </div>
    );
}

export default Auth;
