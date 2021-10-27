import React, { useState, useContext } from 'react'
import { useIonRouter, useIonToast } from '@ionic/react';
// Components
import { IonContent, IonPage, IonText, IonInput, IonButton } from '@ionic/react';
// States
import { AuthenticateUser } from '../states/CurrentUser';
// Appearance
import "./Login.css"

const Login = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonToast();
    // Local states
    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    // Imported states
    const authenticateUser = useContext(AuthenticateUser);

    function navigateToPage(path : string) {
        router.push(path, "forward", "push");
    }

    async function attemptToLogin() {
        const loginResult = await authenticateUser(usernameText, passwordText);
        if (loginResult == 0) {
            navigateToPage("/entrance/mainfeed");
        } else if (loginResult == 1) {
            present({
                buttons: [{ text: 'OK', handler: () => dismiss() }],
                message: "Username needs to be at least 1 character long. Please try again",
                duration: 8000
              })
        } else if (loginResult == 2) {
            present({
                buttons: [{ text: 'OK', handler: () => dismiss() }],
                message: "Password needs to be at least 1 character long. Please try again",
                duration: 8000
            })
        } else if (loginResult == 3) {
            present({
                buttons: [{ text: 'OK', handler: () => dismiss() }],
                message: "Username or password is invalid. Please a valid username and password",
                duration: 8000
              })
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonButton 
                    color="primary" 
                    onClick={() => { navigateToPage("/createAccount") }}
                    class="loginBackButton"
                >
					Back
				</IonButton>

                <IonText class="loginSubtitle">
                    Welcome back! Log in to continue
                </IonText>

                <IonInput
                    clearInput
                    placeholder="Enter your Username"
                    value={usernameText}
                    onIonChange={e => {
                        const textInput = e.detail.value;
                        if (typeof textInput === "string") { setUsernameText(textInput); }
                        else { setUsernameText(""); }
                    }}
                    class="loginTextInput"
                />

                <IonInput
                    type="password"
                    clearInput
                    placeholder="Enter your Password"
                    value={passwordText}
                    onIonChange={e => {
                        const textInput = e.detail.value;
                        if (typeof textInput === "string") { setPasswordText(textInput); }
                        else { setPasswordText(""); }
                    }}
                    class="loginTextInput"
                />

                <IonButton 
                    color="primary" 
                    onClick={async () => { attemptToLogin() }}
                    class="loginButton"
                >
					Log in
				</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Login;