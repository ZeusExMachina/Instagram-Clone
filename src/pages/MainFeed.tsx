import React, { useContext } from 'react'
// Components
import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import Post from '../components/Post';
// States
import { AllPostsOfFollowing, FollowingUserPostInfo, RefreshAllPosts } from '../states/AllPostsOfFollowing';
// Appearance
import './MainFeed.css';

const MainFeed : React.FC = () => {
    const allPostUrlsOfFollowing : FollowingUserPostInfo[] = useContext(AllPostsOfFollowing);
    const refreshAllPosts = useContext(RefreshAllPosts);

    refreshAllPosts();

    return (
        (allPostUrlsOfFollowing.length > 0)
            ?
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle class="mainFeedHeaderText">Insta-Pic</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen class="mainFeedContent">
                        {allPostUrlsOfFollowing.map((post,i) => React.createElement(Post, {key:i, posterUsername:post.posterUsername, postImgUrl:post.postUrl}))}
                    </IonContent>
                </IonPage>
            :
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle class="mainFeedHeaderText">Insta-Pic</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen class="mainFeedContent">
                        <IonText class="mainFeedMessageText">No posts to show. Follow someone to see their posts!</IonText>
                    </IonContent>
                </IonPage>
    );
};

export default MainFeed;