import React, { useContext, useEffect, useState } from 'react'
// Components
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonList } from '@ionic/react';
import UserSearchItem from '../components/UserItem';
// States
import { UserSearchResults, UpdateSearchedUsers } from '../states/UserSearchResults';

const UserSearch : React.FC = () => {
    // Local states
    const [searchText, setSearchText] = useState("");
    // Imported states
    const userSearchResults = useContext(UserSearchResults);
    const updateSearchedUsers = useContext(UpdateSearchedUsers);

    useEffect(() => {
        updateSearchedUsers(searchText);
    }, [searchText])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Search for users</IonTitle>
                </IonToolbar>
                <IonSearchbar
                    value={searchText}
                    onIonChange={e => setSearchText(e.detail.value!)}
                />
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {userSearchResults.map((username,i) => React.createElement(UserSearchItem, {key:i, username:username}))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default UserSearch;