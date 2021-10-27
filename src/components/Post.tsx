import React from 'react'
// Components
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonImg } from '@ionic/react';
// Appearance
import './Post.css'

interface Props {
    posterUsername : string
    postImgUrl : string
}

const Post = (props : Props) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle class="postSubtitleText">{"Posted by " + props.posterUsername}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonImg src={props.postImgUrl}/>
            </IonCardContent>
        </IonCard>
    );
};

export default Post;