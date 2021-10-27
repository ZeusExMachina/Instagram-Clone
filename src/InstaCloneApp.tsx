import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
// Components
import MainTabs from './components/MainTabs';
// Pages
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
// States
import { CurrentUser } from './states/CurrentUser';

const InstaCloneApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const userIsLoggedIn = useContext(IsLoggedIn);
    const currentUser = useContext(CurrentUser);

    useEffect(() => {
        setIsLoggedIn(currentUser.length > 0);
    }, [currentUser])

    return (
        <IonApp>
            <IonReactRouter>
                <Route exact path="/createAccount">
                    <CreateAccount/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route path="/entrance" component={isLoggedIn ? MainTabs : CreateAccount}/>
                <Route exact path="/">
                    <Redirect to="/entrance" />
                </Route>
            </IonReactRouter>
        </IonApp>
    );
}

export default InstaCloneApp;