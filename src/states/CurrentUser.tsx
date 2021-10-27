// 3rd-party Imports
import React, { useEffect, useState } from "react";
// Firebase
import { validateLogin, addNewUser } from "../firebase-access/Firebase_Client";

export const CurrentUser = React.createContext("")
export const AuthenticateUser = React.createContext(async (username:string, password:string) => { return Promise.resolve(-1); })
export const CreateNewUser = React.createContext(async (username:string, password:string) => { return Promise.resolve(-1); })

export default function CurrentUserProvider({ children }:any) {
    const [currentUser, setCurrentUser] = useState<string>("");

    useEffect(() => {
        console.log("currentUser", currentUser);
    }, [currentUser]);

    /**
     * Checks if a valid username-password pair exists.
     * @param username 
     * @param password 
     * @returns one of the following:
     * 0 if successful
     * 1 if the username has a length of < 1
     * 2 if the password has a length of < 1
     * 3 if the username and password both have a length > 1, but this username-password pair does not exist
     */
     async function authenticateUser(username:string, password:string) : Promise<number> {
        if (username.length < 1) { return Promise.resolve(1); }
        else if (password.length < 1) { return Promise.resolve(2); }

        const validateLoginResult = await validateLogin(username, password);

        if (validateLoginResult) {
            setCurrentUser(username);
            return Promise.resolve(0);
        } else {
            return Promise.resolve(3);
        }
    }

    /**
     * Create a new user with a given username and password, but only if a user with a matching username does not already exist.
     * @param username 
     * @param password 
     * @returns one of the following:
     * 0 if successful
     * 1 if the username has a length of < 1
     * 2 if the password has a length of < 1
     * 3 if the username and password both have a length > 1, but a user with the given username already exists
     */
     async function createUser(username:string, password:string) : Promise<number> {
        if (username.length < 1) { return Promise.resolve(1); }
        else if (password.length < 1) { return Promise.resolve(2); }

        const addNewUserResult = await addNewUser(username, password);

        if (addNewUserResult) {
            setCurrentUser(username);
            return Promise.resolve(0);
        } else {
            return Promise.resolve(3);
        }
    }

    return (
        <CurrentUser.Provider value={currentUser}>
            <AuthenticateUser.Provider value={authenticateUser}>
                <CreateNewUser.Provider value={createUser}>
                    { children }
                </CreateNewUser.Provider>
            </AuthenticateUser.Provider>
        </CurrentUser.Provider>
    )
}