// 3rd-party Imports
import React, { useContext, useEffect, useState } from 'react';
// States
import { CurrentUser } from "../states/CurrentUser";
import { FollowingList, RefreshFollowingList } from './FollowingList';
// Firebase
import { getAllPhotosForUser } from '../firebase-access/Firebase_Client';

export interface FollowingUserPostInfo {
    postNameTimestamp : number
    posterUsername : string
    postUrl : string
}

export const AllPostsOfFollowing = React.createContext([] as FollowingUserPostInfo[]);
export const RefreshAllPosts = React.createContext(() => {});

export default function AllPostsOfFollowingProvider({ children }:any) {
    // Local states
    const [allPostsOfFollowing, setAllPostsOfFollowing] = useState<FollowingUserPostInfo[]>([]);
    // Imported states
    const currentUser = useContext(CurrentUser);
    const followingList = useContext(FollowingList);
    const refreshFollowingList = useContext(RefreshFollowingList);

    useEffect(() => {
        // console.log("userPhotoUrls", userPhotoUrls);
        // if (userPhotoUrls.length > 1) { console.log(userPhotoUrls.values); }
    }, [allPostsOfFollowing]);

    useEffect(() => {
        refreshAllPosts();
    }, [currentUser])

    async function refreshAllPosts() {
        refreshFollowingList();
        if (followingList == undefined) { return; }

        // Get all photos from all users we are following and merge them into one map
        let allPhotosToShow : FollowingUserPostInfo[] = [];
        for (let i = 0; i < followingList.length; i++) {
            const followingUsersPosts = await getAllPhotosForUser(followingList[i]); // Get all photos for one user we are following
            followingUsersPosts.forEach((url, nameTimestamp) => allPhotosToShow.push(
                { postNameTimestamp:nameTimestamp, posterUsername:followingList[i], postUrl:url } as FollowingUserPostInfo
            ));
        }

        // Sort posts by reverse chronological order
        allPhotosToShow.sort(
            function(a:FollowingUserPostInfo, b:FollowingUserPostInfo) {
                return b.postNameTimestamp - a.postNameTimestamp;
            }
        )

        // Now that we have a list of urls, compare with the local list to check if it is out of sync
        if (!followingUserPostInfoArraysAreEqual(allPostsOfFollowing,allPhotosToShow)) {
            setAllPostsOfFollowing(allPhotosToShow);
        }
    }

    return (
        <AllPostsOfFollowing.Provider value={allPostsOfFollowing}>
            <RefreshAllPosts.Provider value={refreshAllPosts}>
                { children }
            </RefreshAllPosts.Provider>
        </AllPostsOfFollowing.Provider>
    )
}

function followingUserPostInfoArraysAreEqual(a:FollowingUserPostInfo[], b:FollowingUserPostInfo[]) : boolean {
    if (a.length != b.length) { return false; }

    let arraysAreEqual : boolean = true;
    for (let i = 0; i < a.length; i++) {
        if (a[i].posterUsername != b[i].posterUsername || a[i].postNameTimestamp != b[i].postNameTimestamp) {
            arraysAreEqual = false;
            break;
        }
    }

    return arraysAreEqual;
}