// 3rd-party Imports
import React, { useContext, useEffect, useState } from 'react';
// States
import { CurrentUser } from "../states/CurrentUser";
// Utility
import arraysAreEqual from '../utility/ArraysAreEqual';
// Firebase
import { getAllPhotosForUser } from '../firebase-access/Firebase_Client';

export const UserPhotos = React.createContext([] as string[]);
export const RefreshUserPhotos = React.createContext(async () => {});

export default function UserPhotosProvider({ children }:any) {
    // Local states
    const [userPhotoUrls, setUserPhotoUrls] = useState<string[]>([]);
    // Imported states
    const currentUser = useContext(CurrentUser);

    useEffect(() => {
        console.log("userPhotoUrls", userPhotoUrls);
        if (userPhotoUrls.length > 1) { console.log(userPhotoUrls[0]); }
    }, [userPhotoUrls]);

    useEffect(() => {
        refreshFollowingList();
    }, [currentUser])

    async function refreshFollowingList() {
        const photoUrlsFromFirebase = await getAllPhotosForUser(currentUser);
        if (!arraysAreEqual(userPhotoUrls,photoUrlsFromFirebase)) {
            setUserPhotoUrls(photoUrlsFromFirebase);
        }
    }

    return (
        <UserPhotos.Provider value={userPhotoUrls}>
            <RefreshUserPhotos.Provider value={refreshFollowingList}>
                { children }
            </RefreshUserPhotos.Provider>
        </UserPhotos.Provider>
    );
}