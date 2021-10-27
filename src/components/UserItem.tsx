import React, { useContext, useEffect, useState } from 'react'
// Components
import { add, remove,  } from 'ionicons/icons';
import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
// States
import { FollowingList, IsFollowing, ToggleFollowingUser, RefreshFollowingList } from '../states/FollowingList'

interface Props {
    username : string
}

const UserItem = (props : Props) => {
    // ImportedState
    const followingList = useContext(FollowingList);
    const isFollowing = useContext(IsFollowing);
    const toggleFollowingUser = useContext(ToggleFollowingUser);
    const refreshFollowingList = useContext(RefreshFollowingList)
    // Local states
    const [currentlyFollowing, setCurrentlyFollowing] = useState<boolean|undefined>(undefined);
    
    useEffect(() => {
        if (currentlyFollowing == undefined) {
            isFollowing(props.username).then(value => setCurrentlyFollowing(value));
        }
        // console.log("currentlyFollowing", currentlyFollowing)
    }, [currentlyFollowing])

    useEffect(() => {
        // console.log("in useEffect");
        isFollowing(props.username).then(value => setCurrentlyFollowing(value));
    }, [followingList])

    async function toggleCurrentlyFollowing() {
        await refreshFollowingList();
        await toggleFollowingUser(props.username);
        await refreshFollowingList();
    }
    
    return (
        <IonItem>
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