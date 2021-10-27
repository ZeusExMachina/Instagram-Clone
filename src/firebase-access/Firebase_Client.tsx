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

/**
 * Updates the following list of currentUser to include/exclude usernameToFollow
 * @param usernameToFollow 
 * @param currentUser 
 */
async function updateFollowingUser(usernameToFollow:string, currentUser:string) {
    const currentFollowingList = await getUserFollowing(currentUser);

    if (currentFollowingList.includes(usernameToFollow)) {
        // Currently following, so un-follow
        const indexOfUserInFollowing = currentFollowingList.indexOf(usernameToFollow);
        if (indexOfUserInFollowing != -1) { currentFollowingList.splice(indexOfUserInFollowing, 1); }
    } else {
        // Currently not following, so follow
        currentFollowingList.push(usernameToFollow);
    }

    const userRef = FirestoreDB.collection("users").doc(currentUser);
    userRef.update({
        following: currentFollowingList
    });
}

/**
 * Updates the follower list of userToUpdate by including/excluding usernameOfFollower
 * @param usernameOfFollower 
 * @param userToUpdate 
 */
async function updateFollower(usernameOfFollower:string, userToUpdate:string) {
    const currentFollowerList = await getUserFollowers(userToUpdate);

    if (currentFollowerList.includes(usernameOfFollower)) {
        // Currently following, so un-follow
        const indexOfUserInFollowers = currentFollowerList.indexOf(usernameOfFollower);
        if (indexOfUserInFollowers != -1) { currentFollowerList.splice(indexOfUserInFollowers, 1); }
    } else {
        // Currently not following, so follow
        currentFollowerList.push(usernameOfFollower);
    }

    const userRef = FirestoreDB.collection("users").doc(userToUpdate);
    userRef.update({
        followers: currentFollowerList
    });
}

export async function toggleFollowingUser(usernameToToggle:string, currentUser:string) {
    if (await userExists(currentUser) == false || await userExists(usernameToToggle) == false) { return }

    updateFollowingUser(usernameToToggle, currentUser)

    updateFollower(currentUser, usernameToToggle)
}

export async function getUserFollowers(username:string) : Promise<string[]> {
    if (await userExists(username) == false) { return Promise.resolve([]); }

    let followerList : string[] = [];
    const userRef = FirestoreDB.collection("users").doc(username);
    const userSnapshot = await userRef.get()
    followerList = userSnapshot.get("followers")

    return Promise.resolve(followerList);
}

// ---------------------------------
// Images in Firebase Storage 
// ---------------------------------
export async function uploadPhoto(username:string, filename:string, base64Data:string) {
    if (await userExists(username) == false) { return Promise.resolve([]); }

    const storageRef = FirebaseStorage.ref().child(username + "/" + filename);

    storageRef.putString(base64Data, 'data_url').then(() => {
        console.log('Uploaded a base64 string!');
    });
}

export async function getAllPhotosForUser(username:string) : Promise<Map<number,string>> {
    if (await userExists(username) == false) { return Promise.resolve(new Map<number,string>()); }

    const userPhotosRef = FirebaseStorage.ref().child(username);

    const allUsersPhotosListResult = await userPhotosRef.listAll();
    const allUsersPhotos = allUsersPhotosListResult.items;

    let photos = new Map<number,string>();
    for (let i = 0; i < allUsersPhotos.length; i++) {
        const photoName = parseInt(allUsersPhotos[i].name.slice(0,-4))
        photos.set(photoName, await allUsersPhotos[i].getDownloadURL());
    }

    return Promise.resolve(photos);
}