// Firebase
import { FirestoreDB, FirebaseStorage } from "../firebase";

async function userExists(username:string) : Promise<boolean> {
    let userExists = false;

    const usersRef = FirestoreDB.collection("users");
    const usersSnapshot = await usersRef.get();
    usersSnapshot.forEach(async (doc:any) => {
        if (doc.id == username && userExists == false) {
            userExists = true;
        }
    });

    return Promise.resolve(userExists);
}

/**
 * Checks whether a given username exists, and if so, whether the given password matches that found in Firebase.
 * @param username 
 * @param password 
 * @returns true if the username-password pair exists, false if not
 */
 export async function validateLogin(username:string, password:string) : Promise<boolean> {
    if (await userExists(username) == false) { return Promise.resolve(false); }

    let passwordMatches = false;
    const userRef = FirestoreDB.collection("users").doc(username);
    const userSnapshot = await userRef.get();
    if (userSnapshot.get("password") == password) { passwordMatches = true; }

    return Promise.resolve(passwordMatches);
}

/**
 * Adds a new user to Firebase with the given username and password. Initialises them with empty Favourites and Recently Searched lists.
 * Also checks if the given username already exists or not. If it does, do not add a new user.
 * @param username
 * @param password 
 * @returns false if a user with the given username already exists, or true if a new user was successfully registered
 */
 export async function addNewUser(username:string, password:string) : Promise<boolean> {
    if (await userExists(username) == true) { return Promise.resolve(false); }

    const newUserRef = FirestoreDB.collection("users").doc(username);
    const setWithMerge = newUserRef.set({
        password: password,
        followers: [],
        following: []
    //     favourites: [],
    //     recent: {}, // Map that is intended to have key->ingredient, value->ingredient was searched for "value" number of times ago
    }, { merge: true })

    return Promise.resolve(true);
}

export async function getAllUsernames() : Promise<string[]> {
    let allUsers : string[] = [];

    const usersRef = FirestoreDB.collection("users");
    const usersSnapshot = await usersRef.get();
    usersSnapshot.forEach(async (doc:any) => {
        allUsers.push(doc.id);
    });

    return Promise.resolve(allUsers);
}

export async function getUserFollowing(username:string) : Promise<string[]> {
    if (await userExists(username) == false) { return Promise.resolve([]); }

    let followingList : string[] = [];
    const userRef = FirestoreDB.collection("users").doc(username);
    const userSnapshot = await userRef.get()
    followingList = userSnapshot.get("following")

    return Promise.resolve(followingList);
}

export async function toggleFollowingUser(usernameToToggle:string, currentUser:string) {
    if (await userExists(currentUser) == false || await userExists(usernameToToggle) == false) { return }

    const currentFollowingList = await getUserFollowing(currentUser);

    if (currentFollowingList.includes(usernameToToggle)) {
        // Currently following, so un-follow
        const indexOfUserInFollowing = currentFollowingList.indexOf(usernameToToggle);
        if (indexOfUserInFollowing != -1) { currentFollowingList.splice(indexOfUserInFollowing, 1); }
    } else {
        currentFollowingList.push(usernameToToggle);
    }

    const userRef = FirestoreDB.collection("users").doc(currentUser);
    userRef.update({
        following: currentFollowingList
    });
}

export async function getUserFollowers(username:string) : Promise<string[]> {
    if (await userExists(username) == false) { return Promise.resolve([]); }

    let followerList : string[] = [];
    const userRef = FirestoreDB.collection("users").doc(username);
    const userSnapshot = await userRef.get()
    followerList = userSnapshot.get("followers")

    return Promise.resolve(followerList);
}