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

