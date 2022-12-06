import { Switch } from 'react-router-dom';
import Route from './Route';


import SingIn from '../pages/SingIn';
import SingUp from '../pages/SingUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';
import New from '../pages/New';

export default function Routes(){
    return(
        <Switch>
            <Route exact path='/' component={SingIn} />
            <Route exact path='/register' component={SingUp} />

            <Route exact path='/dashboard' component={Dashboard} isPrivate/>
            <Route exact path='/profile' component={Profile} isPrivate />
            <Route exact path='/customers' component={Customers} isPrivate />
            <Route exact path='/new' component={New} isPrivate />
            <Route exact path='/new/:id' component={New} isPrivate />
        </Switch>
    )
}