import { Redirect, Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { home, search, camera, person } from 'ionicons/icons';
import MainFeed from '../pages/MainFeed';
import UserSearch from '../pages/UserSearch';
import TakePhoto from '../pages/TakePhoto';
import Profile from '../pages/Profile';
import FollowingListDisplay from '../pages/FollowingListDisplay';
import FollowerListDisplay from '../pages/FollowerListDisplay';

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
                <Route exact path="/entrance/followinglist">
                    <FollowingListDisplay />
                </Route>
                <Route exact path="/entrance/followerlist">
                    <FollowerListDisplay />
                </Route>
                <Route exact path="/entrance">
                    <Redirect to="/entrance/mainfeed" />
                </Route>
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
            </IonTabBar>
        </IonTabs>
    )
}

export default MainTabs;