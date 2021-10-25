import React, { useContext, useEffect, useState } from 'react'

import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react'
// States
import { CurrentUser } from '../states/CurrentUser'
import { FollowingList } from '../states/FollowingList'
import { FollowerList } from '../states/FollowerList'
import { UserPhotos, RefreshUserPhotos } from '../states/UserPhotos'

const UserProfile = () => {
    // Imported states
    const currentUser = useContext(CurrentUser);
    const numOfFollowing = useContext(FollowingList).length;
    const numOfFollowers = useContext(FollowerList).length;
    const userPhotoUrls = useContext(UserPhotos);
    const refreshUserPhotos = useContext(RefreshUserPhotos);

    refreshUserPhotos();

    const createRowsAndColsOfPhotos = () => {
        let listOfRows : any[] = [];
        let listOfCols : any[] = [];

        function pushColsToRows() {
            for (let i = listOfCols.length; i < 3; i++) {
                listOfCols.push(<IonCol/>);
            }
            listOfRows.push(
                <IonRow>
                    {listOfCols.map((ionCol, i) => ionCol)}
                </IonRow>
            );
        }

        for (let i = 0; i < userPhotoUrls.length; i++) {
            if (listOfCols.length == 3) {
                pushColsToRows();
                listOfCols = [];
            }
            listOfCols.push(
                <IonCol>
                    <IonImg src={userPhotoUrls[i]}/>
                </IonCol>
            );
        }
        pushColsToRows();

        return (
            <IonGrid>
                {listOfRows.map((ionRow, i) => ionRow)}
            </IonGrid>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{currentUser}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>
                    <IonButton
                        onClick={() => {}}
                    >
                        { numOfFollowers }
                        <IonText>Followers</IonText>
                    </IonButton>
                    <IonButton
                        onClick={() => {}}
                    >
                        { numOfFollowing }
                        <IonText>Following</IonText>
                    </IonButton>
                </div>
                {/* <IonImg src={singleImg}/> */}
                {createRowsAndColsOfPhotos()}
            </IonContent>
        </IonPage>
    );
}

export default UserProfile;