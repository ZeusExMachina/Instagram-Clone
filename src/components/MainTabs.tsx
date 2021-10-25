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
import { ellipse, home, search, square, triangle } from 'ionicons/icons';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import CreateAccount from '../pages/CreateAccount';
import Login from '../pages/Login';
import MainFeed from '../pages/MainFeed';
import UserSearch from '../pages/UserSearch';

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
                <Route exact path="/entrance/tab1">
                    <Tab1 />
                </Route>
                <Route exact path="/entrance/tab2">
                    <Tab2 />
                </Route>
                <Route path="/entrance/tab3">
                    <Tab3 />
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
                <IonTabButton tab="tab1" href="/entrance/tab1">
                    <IonIcon icon={triangle} />
                    <IonLabel>Tab 1</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/entrance/tab2">
                    <IonIcon icon={ellipse} />
                    <IonLabel>Tab 2</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/entrance/tab3">
                    <IonIcon icon={square} />
                    <IonLabel>Tab 3</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default MainTabs;