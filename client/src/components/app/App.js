import React from 'react'
import { AppHeader } from '../appHeader'
import Auth from '../pages/auth/Auth'

import './app.scss'


function App() {
  return (
    <React.Fragment>
      <AppHeader/>
      <div className="container auth-container">
        <Auth/>
      </div>
    </React.Fragment>
  );
}

export default App;
