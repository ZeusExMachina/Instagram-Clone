import React, { useContext, useState } from 'react'
import { useIonRouter } from '@ionic/react';
// Components
import { IonContent, IonPage, IonText, IonButton, IonInput } from '@ionic/react';
// States
import { CreateNewUser } from '../states/CurrentUser';

const CreateAccount = () => {
    const router = useIonRouter();
    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    // Imported states
    const createNewUser = useContext(CreateNewUser);

    function navigateToPage(path : string) {
        router.push(path, "forward", "push");
    }

    async function attemptToCreateAccount() {
        const createAccountResult = await createNewUser(usernameText, passwordText);
        if (createAccountResult == 0) { navigateToPage("/entrance/mainfeed"); }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonText>
                    Insta-clone app
                </IonText>

                <IonText>
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
                />

                <IonButton 
                    color="primary" 
                    onClick={async () => { attemptToCreateAccount(); }
                }>
					Get Started
				</IonButton>

                <IonText>
                    Already have an account? Log in
                </IonText>

                <IonButton color="primary" onClick={ () => { navigateToPage("/login"); } }>
					Log in
				</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default CreateAccount;