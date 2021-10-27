import React, { useState, useContext } from 'react'
import { useIonRouter } from '@ionic/react';
// Components
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonInput, IonButton } from '@ionic/react';
// States
import { AuthenticateUser } from '../states/CurrentUser';

const Login = () => {
    const router = useIonRouter();
    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    // Imported states
    const authenticateUser = useContext(AuthenticateUser);

    function navigateToPage(path : string) {
        router.push(path, "forward", "push");
    }

    async function attemptToLogin() {
        const loginResult = await authenticateUser(usernameText, passwordText);
        if (loginResult == 0) { navigateToPage("/entrance/mainfeed"); }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonButton 
                    color="primary" 
                    onClick={() => { navigateToPage("/createAccount") }}
                >
					Back
				</IonButton>

                <IonText>
                    Welcome back! Please log in to continue
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
                />

                <IonButton 
                    color="primary" 
                    onClick={async () => { attemptToLogin() }}
                >
					Log in
				</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Login;