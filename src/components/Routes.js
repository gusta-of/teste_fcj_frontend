  
import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from '../pages/login/login'
import Register from '../pages/register/Register'
import Home from '../pages/home/home'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute'


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route component={Login} exact path="/login"/>
            <Route component={Register} exact path="/register"/>
            <Route component={Home} exact path="/"/>
            <PrivateRoute component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default Routes