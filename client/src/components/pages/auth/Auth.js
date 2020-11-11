import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {RegisterForm} from '../../registerForm'
import {LoginForm} from '../../loginForm'

import './auth.scss'

const Auth = () => {
    return (
        <div className = 'auth'>
            <Switch>
                <Route path = '/login' component = {LoginForm}/>
                <Route path = '/register' component = {RegisterForm}/>
            </Switch>
        </div>
    );
}

export default Auth;
