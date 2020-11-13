import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {RegisterForm} from '../../registerForm'
import {LoginForm} from '../../loginForm'

import './auth.scss'
import { useDispatch, useSelector } from 'react-redux';
import { onAuth } from '../../../redux/actions/user';
import { Disk } from '../../Disk';

const Auth = () => {

    const {isAuth} = useSelector(state => state.user)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(onAuth())
    }, [])
    
    return (
        <div className = 'auth'>
            {!isAuth ?
                <Switch>
                    <Route path = {['/login', '/']} component = {LoginForm} exact/>
                    <Route path = '/register' component = {RegisterForm}/>
                    <Redirect to = '/login'/>
                </Switch>
                :
                <Switch>
                    <Route path = '/' component = {Disk}/>
                    <Redirect to = '/'/>
                </Switch>
            }
        </div>
    );
}

export default Auth;
