import React, { useContext, useEffect, useState } from 'react'
// Components
import { add, remove } from 'ionicons/icons';
import { IonAvatar, IonButton, IonIcon, IonImg, IonItem, IonLabel } from '@ionic/react';
// States
import { FollowingList, IsFollowing, ToggleFollowingUser } from '../states/FollowingList'

interface Props {
    username : string
}

const UserItem = (props : Props) => {
    // ImportedState
    const followingList = useContext(FollowingList);
    const isFollowing = useContext(IsFollowing);
    const toggleFollowingUser = useContext(ToggleFollowingUser);
    // Local states
    const [currentlyFollowing, setCurrentlyFollowing] = useState<boolean|undefined>(undefined);
    
    useEffect(() => {
        if (currentlyFollowing == undefined) {
            isFollowing(props.username).then(value => setCurrentlyFollowing(value));
        }
        console.log("currentlyFollowing", currentlyFollowing)
    }, [currentlyFollowing])

    useEffect(() => {
        isFollowing(props.username).then(value => setCurrentlyFollowing(value));
    }, [followingList])

    async function toggleCurrentlyFollowing() {
        await toggleFollowingUser(props.username);
    }
    
    return (
        <IonItem>
            <IonAvatar>
                <IonImg src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"/>
            </IonAvatar>
            <IonLabel>{props.username}</IonLabel>
            <IonButton
                color="primary" 
                onClick={async () => { toggleCurrentlyFollowing(); }}
            >
                <IonIcon icon={currentlyFollowing ? remove : add}/>
            </IonButton>
        </IonItem>
    );
}

export default UserItem;