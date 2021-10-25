import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent } from '@ionic/react';
// Components
import Post from '../components/Post';
import ExploreContainer from '../components/ExploreContainer';

const MainFeed : React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Main Feed</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Main Feed here!</IonTitle>
                </IonToolbar>
                </IonHeader>
                {/* <ExploreContainer name="Main Feed here!" /> */}
                <Post/>
            </IonContent>
        </IonPage>
    );
};

export default MainFeed;