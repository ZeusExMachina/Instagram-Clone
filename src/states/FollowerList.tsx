// 3rd-party Imports
import React, { useContext, useState } from 'react'
// States
import { CurrentUser } from "../states/CurrentUser";
// Utility
import arraysAreEqual from '../utility/ArraysAreEqual';
// Firebase
import { getUserFollowers } from '../firebase-access/Firebase_Client';

export const FollowerList = React.createContext([] as string[]);
export const RefreshFollowerList = React.createContext(async () => {});

export default function FollowerListProvider({ children }:any) {
    // Local states
    const [followerList, setFollowerList] = useState<string[]>([]);
    // Imported states
    const currentUser = useContext(CurrentUser);

    async function refreshFollowerList() {
        const followingListFromFirebase = await getUserFollowers(currentUser);

        if (!arraysAreEqual(followerList,followingListFromFirebase)) {
            setFollowerList(followingListFromFirebase);
        }
    }

    return (
        <FollowerList.Provider value={followerList}>
            <RefreshFollowerList.Provider value={refreshFollowerList}>
                { children }
            </RefreshFollowerList.Provider>
        </FollowerList.Provider>
    );
}