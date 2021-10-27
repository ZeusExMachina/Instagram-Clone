import React, { useContext } from 'react'
// Components
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonBackButton } from '@ionic/react';
import UserSearchItem from '../components/UserItem';
// States
import { FollowingList } from '../states/FollowingList';
// Appearances
import { chevronBackOutline } from 'ionicons/icons';


const FollowingListDisplay = () => {
    const followingList = useContext(FollowingList);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Users you follow</IonTitle>
                    <IonBackButton icon={chevronBackOutline}/>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {followingList.map((username,i) => React.createElement(UserSearchItem, {key:i, username:username}))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default FollowingListDisplay;