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
        // console.log("userPhotoUrls", userPhotoUrls);
        // if (userPhotoUrls.length > 1) { console.log(userPhotoUrls.values); }
    }, [userPhotoUrls]);

    useEffect(() => {
        refreshPhotoUrls();
    }, [currentUser]);

    async function refreshPhotoUrls() {
        const photoFromFirebase = await getAllPhotosForUser(currentUser);
        
        //  Sort photos into reverse-chronological order
        let photoNameTimestamps : number[] = Array.from(photoFromFirebase.keys());
        photoNameTimestamps.sort();
        photoNameTimestamps = photoNameTimestamps.reverse();

        // Then get the urls by reverse-chronological order
        let photoUrls : string[] = [];
        for (let i = 0; i < photoNameTimestamps.length; i++) {
            photoUrls.push(photoFromFirebase.get(photoNameTimestamps[i])!);
        }
        
        // Now that we have the list of photo urls, update the local list if it is out of sync
        if (!arraysAreEqual(userPhotoUrls,photoUrls)) {
            setUserPhotoUrls(photoUrls);
        }
    }

    return (
        <UserPhotos.Provider value={userPhotoUrls}>
            <RefreshUserPhotos.Provider value={refreshPhotoUrls}>
                { children }
            </RefreshUserPhotos.Provider>
        </UserPhotos.Provider>
    );
}