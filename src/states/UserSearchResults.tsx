// 3rd-party Imports
import React, { useContext, useEffect, useState } from "react";
// States
import { CurrentUser } from "./CurrentUser";
// Firebase
import { getAllUsernames } from "../firebase-access/Firebase_Client";

export const UserSearchResults = React.createContext([] as string[]);
export const UpdateSearchedUsers = React.createContext(async (searchText:string) => {});

export default function UserSearchResultsProvider({ children }:any) {
    // Local states
    const [userSearchResults, setUserSearchResults] = useState<string[]>([]);
    // Imported states
    const currentUserName = useContext(CurrentUser);

    async function updateSearchedUsers(searchText : string) {
        if (searchText.length < 1) {
            // If nothing is typed into the search bar, then no ingredients are returned as results
            setUserSearchResults([]);
        } else {
            let searchResults : string[] = [];
            let allUsers = await getAllUsernames();
            for (let i = 0; i < allUsers.length; i++) {
                if (allUsers[i].startsWith(searchText) && allUsers[i]!=currentUserName) {
                        searchResults.push(allUsers[i]);
                }
            }
            setUserSearchResults(searchResults);
        }
    }

    return (
        <UserSearchResults.Provider value={userSearchResults}>
            <UpdateSearchedUsers.Provider value={updateSearchedUsers}>
                { children }
            </UpdateSearchedUsers.Provider>
        </UserSearchResults.Provider>
    );
}