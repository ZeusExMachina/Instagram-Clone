import React, { useContext } from 'react'
// Components
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Post from '../components/Post';
// States
import { AllPostsOfFollowing, FollowingUserPostInfo, RefreshAllPosts } from '../states/AllPostsOfFollowing';

const MainFeed : React.FC = () => {
    const allPostUrlsOfFollowing : FollowingUserPostInfo[] = useContext(AllPostsOfFollowing);
    const refreshAllPosts = useContext(RefreshAllPosts);

    refreshAllPosts();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Main Feed</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {allPostUrlsOfFollowing.map((post,i) => React.createElement(Post, {key:i, posterUsername:post.posterUsername, postImgUrl:post.postUrl}))}
            </IonContent>
        </IonPage>
    );
};

export default MainFeed;