import React from 'react'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonImg } from '@ionic/react';

interface Props {
    posterUsername : string
    postImgUrl : string
}

const Post = (props : Props) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>{"By " + props.posterUsername}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonImg src={props.postImgUrl}/>
            </IonCardContent>
        </IonCard>
    );
};

export default Post;