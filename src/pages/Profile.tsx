import React, { useContext, useEffect, useState } from 'react'

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
// States
import { CurrentUser } from '../states/CurrentUser'
import { FollowingList } from '../states/FollowingList'
import { FollowerList } from '../states/FollowerList'

const UserProfile = () => {
    // Imported states
    const currentUser = useContext(CurrentUser);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{currentUser}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                
            </IonContent>
        </IonPage>
    );
}

export default UserProfile;