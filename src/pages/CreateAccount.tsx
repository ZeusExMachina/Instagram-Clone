import React, { useContext, useState } from 'react'
import { useIonRouter, useIonToast } from '@ionic/react';
// Components
import { IonContent, IonPage, IonText, IonButton, IonInput } from '@ionic/react';
// States
import { CreateNewUser } from '../states/CurrentUser';
// Appearance
import "./CreateAccount.css"

const CreateAccount = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonToast();
    // Local states
    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    // Imported states
    const createNewUser = useContext(CreateNewUser);

    function navigateToPage(path : string) {
        router.push(path, "forward", "push");
    }

    async function attemptToCreateAccount() {
        const createAccountResult = await createNewUser(usernameText, passwordText);
        if (createAccountResult == 0) {
            navigateToPage("/entrance/mainfeed");
        } else if (createAccountResult == 1) {
            present({
                buttons: [{ text: 'OK', handler: () => dismiss() }],
                message: "Username needs to be at least 1 character long. Please try again",
                duration: 8000
              })
        } else if (createAccountResult == 2) {
            present({
                buttons: [{ text: 'OK', handler: () => dismiss() }],
                message: "Password needs to be at least 1 character long. Please try again",
                duration: 8000
            })
        } else if (createAccountResult == 3) {
            present({
                buttons: [{ text: 'OK', handler: () => dismiss() }],
                message: "That username already exists. Please enter a different username",
                duration: 8000
              })
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonText class="createAccTitle">
                    Insta-Pic
                </IonText>

                <IonText class="createAccSubtitle">
                    Create an account to get started
                </IonText>

                <IonInput
                    clearInput
                    placeholder="Enter a Username"
                    value={usernameText}
                    onIonChange={e => {
                        const textInput = e.detail.value;
                        if (typeof textInput === "string") { setUsernameText(textInput); }
                        else { setUsernameText(""); }
                    }}
                    class="createAccTextInput"
                />

                <IonInput
                    type="password"
                    clearInput
                    placeholder="Enter a Password"
                    value={passwordText}
                    onIonChange={e => {
                        const textInput = e.detail.value;
                        if (typeof textInput === "string") { setPasswordText(textInput); }
                        else { setPasswordText(""); }
                    }}
                    class="createAccTextInput"
                />

                <IonButton 
                    color="primary" 
                    onClick={async () => { attemptToCreateAccount(); }}
                    class="createAccButton"
                >
					Get Started
				</IonButton>

                <IonText class="createAccSubtitle">
                    Already have an account? Log in
                </IonText>

                <IonButton
                    color="primary" 
                    onClick={ () => { navigateToPage("/login"); }}
                    class="createAccButton"
                >
					Log in
				</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default CreateAccount;