// 3rd-party Imports
import React, { useContext, useEffect, useState } from 'react'
// States
import { CurrentUser } from "../states/CurrentUser";
// Utility
import arraysAreEqual from '../utility/ArraysAreEqual';
// Firebase
import { getUserFollowing, toggleFollowingUser } from '../firebase-access/Firebase_Client';

export const FollowingList = React.createContext([] as string[]);
export const IsFollowing = React.createContext(async (username:string) => { return false as boolean })
export const ToggleFollowingUser = React.createContext(async (usernameToToggle:string) => {});
export const RefreshFollowingList = React.createContext(async () => {});

export default function FollowingListProvider({ children }:any) {
    // Local states
    const [followingList, setFollowingList] = useState<string[]>([]);
    // Imported states
    const currentUser = useContext(CurrentUser);

    useEffect(() => {
        console.log("followingList", followingList);
    }, [followingList]);

    useEffect(() => {
        refreshFollowingList();
    }, [currentUser])

    async function isFollowing(username : string) : Promise<boolean> {
        return Promise.resolve(followingList.includes(username));
    }

    async function toggleFollowingUserInFirebase(usernameToToggle : string) {
        await toggleFollowingUser(usernameToToggle, currentUser);
        await refreshFollowingList();
    }   

    async function refreshFollowingList() {
        const followingListFromFirebase = await getUserFollowing(currentUser);
        if (!arraysAreEqual(followingList,followingListFromFirebase)) {
            setFollowingList(followingListFromFirebase);
        }
    }

    return (
        <FollowingList.Provider value={followingList}>
            <IsFollowing.Provider value={isFollowing}>
                <ToggleFollowingUser.Provider value={toggleFollowingUserInFirebase}>
                    <RefreshFollowingList.Provider value={refreshFollowingList}>
                        { children }
                    </RefreshFollowingList.Provider>
                </ToggleFollowingUser.Provider>
            </IsFollowing.Provider>
        </FollowingList.Provider>
    );
}