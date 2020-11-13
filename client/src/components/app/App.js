import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Redirect, Switch, Route} from 'react-router-dom'
import { AppHeader } from '../appHeader'
import {RegisterForm} from '../registerForm'
import {LoginForm} from '../loginForm'
import Disk from '../disk'
import {onAuth} from '../../redux/actions/user'

import './app.scss'


function App() {

  const dispatch = useDispatch()
  const {isAuth} = useSelector(state => state.user)


  React.useEffect(() => {
    dispatch(onAuth())
  }, [])

  

  return (
    <React.Fragment>
      <AppHeader/>
      <div className="container home-container">        
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
    </React.Fragment>
  );
}

export default App;
