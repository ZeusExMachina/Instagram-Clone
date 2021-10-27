import React, { useContext } from 'react'
// Components
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonBackButton, IonText } from '@ionic/react';
import UserSearchItem from '../components/UserItem';
// States
import { FollowerList } from '../states/FollowerList';
// Appearances
import { chevronDownOutline } from 'ionicons/icons';
import './FollowerListDisplay.css'

const FollowerListDisplay = () => {
    const followerList = useContext(FollowerList);

    return (
        (followerList.length > 0)
            ?
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle class="followerHeaderText">Users that follow you</IonTitle>
                            <IonBackButton class="followerBackButton" icon={chevronDownOutline}/>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        <IonList>
                            {followerList.map((username,i) => React.createElement(UserSearchItem, {key:i, username:username}))}
                        </IonList>
                    </IonContent>
                </IonPage>
            :
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Users that follow you</IonTitle>
                            <IonBackButton icon={chevronDownOutline}/>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        <IonText>Nobody is following you</IonText>
                    </IonContent>
                </IonPage>
    );
}

export default FollowerListDisplay;