import React, { useContext } from 'react'
import { useIonRouter } from '@ionic/react';
// Components
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react'
// States
import { CurrentUser } from '../states/CurrentUser'
import { FollowingList, RefreshFollowingList } from '../states/FollowingList'
import { FollowerList, RefreshFollowerList } from '../states/FollowerList'
import { UserPhotos, RefreshUserPhotos } from '../states/UserPhotos'
// Appearance
import './Profile.css'

const UserProfile = () => {
    const router = useIonRouter();
    // Imported states
    const currentUser = useContext(CurrentUser);
    const numOfFollowing = useContext(FollowingList)!.length;
    const numOfFollowers = useContext(FollowerList)!.length;
    const userPhotoUrls = useContext(UserPhotos);
    const refreshFollowingList = useContext(RefreshFollowingList);
    const refreshFollowerList = useContext(RefreshFollowerList);
    const refreshUserPhotos = useContext(RefreshUserPhotos);

    refreshFollowingList();
    refreshFollowerList();
    refreshUserPhotos();

    function navigateToPage(path : string) {
        router.push(path, "forward", "push");
    }

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
                    <IonTitle class="profileHeaderText">{currentUser}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="profileButtonArray">
                    <IonButton
                        onClick={() => { navigateToPage("/entrance/followerlist"); }}
                    >
                        { numOfFollowers }
                        <IonText>Followers</IonText>
                    </IonButton>
                    <IonButton
                        onClick={() => { navigateToPage("/entrance/followinglist"); }}
                    >
                        { numOfFollowing }
                        <IonText>Following</IonText>
                    </IonButton>
                </div>
                <div className="profilePhotoArray">
                    {createRowsAndColsOfPhotos()}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default UserProfile;