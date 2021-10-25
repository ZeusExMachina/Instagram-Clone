import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom';
import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { ellipse, home, search, square, triangle, camera, person } from 'ionicons/icons';
import Tab1 from '../pages/Tab1';
import CreateAccount from '../pages/CreateAccount';
import Login from '../pages/Login';
import MainFeed from '../pages/MainFeed';
import UserSearch from '../pages/UserSearch';
import TakePhoto from '../pages/TakePhoto';
import Profile from '../pages/Profile';

const MainTabs = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/entrance/mainfeed">
                    <MainFeed />
                </Route>
                <Route exact path="/entrance/usersearch">
                    <UserSearch />
                </Route>
                <Route exact path="/entrance/takephoto">
                    <TakePhoto />
                </Route>
                <Route exact path="/entrance/profile">
                    <Profile />
                </Route>
                <Route exact path="/entrance/tab1">
                    <Tab1 />
                </Route>
                {/* <Route exact path="/">
                    <Redirect to="/tab1" />
                </Route> */}
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="mainfeed" href="/entrance/mainfeed">
                    <IonIcon icon={home} />
                    <IonLabel>Feed</IonLabel>
                </IonTabButton>
                <IonTabButton tab="usersearch" href="/entrance/usersearch">
                    <IonIcon icon={search} />
                    <IonLabel>Search</IonLabel>
                </IonTabButton>
                <IonTabButton tab="takephoto" href="/entrance/takephoto">
                    <IonIcon icon={camera} />
                    <IonLabel>Take photo</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/entrance/profile">
                    <IonIcon icon={person} />
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab1" href="/entrance/tab1">
                    <IonIcon icon={triangle} />
                    <IonLabel>Tab 1</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default MainTabs;