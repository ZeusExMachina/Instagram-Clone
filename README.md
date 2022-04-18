# Instragram Clone IOT App
Social media platform mobile IOT app, mimicking Instagram's main features. Solo Ionic React mobile app project from SWEN325 in 2021 at VUW.

# To run this Ionic application, follow these steps:
1. Install Ionic, including Ionic Lab to see the app on a phone simulator
2. Clone this repository
3. Open the root of the project and install all dependencies by running the "npm i" command
4. IMPORTANT: At this stage the version of Firebase downloaded using npm i is not compatible with the app, so you would need to replace it with the Firebase dependency folders that work. These folders are in the root of the project as a zip file called "firebase-replacement-dependencies.zip".
    4.1. Open the "node_modules" folder and delete the "@firebase" and "firebase" folders.
    4.2. Unzip the "firebase-replacement-dependencies.zip" file and copy the "@firebase" and "firebase" folders inside it into the "node_modules" folder.
5. Run the command "ionic serve --lab" (or just "ionic serve" for a non-Ionin lab version, although this isnot preferred) from the root of the project. This should open the app.
6. Play around with it! Feel free to make your own account. To follow some users, some existing users have the usernames of "zeus", "ice", and "might".

## Create Account page
This is the landing page of the app. The user may register new accounts on this screen to 
access the app.

![](resources/Create-Account.png)

## Login page
Accessed by pressing the “Log In” button on the Create Account page. Here a user can 
access an existing account by entering its credentials. Once authorised, the follower list, 
following list, and posted pictures are loaded.

![](resources/Login.png)

## Main Feed page
This is the page the user is taken to upon successful account creation or login. This page
shows a list of all photos posted by all users the currently logged in user is following. These 
photos are displayed in reverse-chronological order.

![](resources/Main-Feed.png)

## User Search page
The user can press the “Search” tab button to switch to this page. Here, the user can search 
for usernames of other users. Each listed user shows whether the currently logged in user is 
following that listed user or not (shows + if not currently following, shows – if currently 
following).

![](resources/User-Search.png)

## Take photo page
On this page, the user may take photos with a camera by pressing the “Take Photo” button, 
and then posting the taken photo to be seen by others.

![](resources/Take-Photo.png)

## Camera open

![](resources/Camera-Open.png)

## Photo taken and displayed, ready to be posted

![](resources/Photo-Taken.png)

## Profile page
Here, a user can see how many users they are being followed by and how many users they 
are following. Note that both displays are buttons that when tapped, lead to their own 
page. On this page, they can also see all photos they have previously posted.

![](resources/Profile.png)

## Followers list display
This shows an exhaustive list of all users following the currently logged in user. Each shown 
user can be followed/unfollowed.

![](resources/Followers-List.png)

## Following list display
This shows an exhaustive list of all users that the currently logged in user is following. Each 
user shown here can be unfollowed to be removed from this list.

![](resources/Following-List.png)
