// 3rd-party Imports
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react'
// States
import { CurrentUser } from '../states/CurrentUser';
// Hooks
import { usePhotoGallery } from "../hooks/usePhotoGallery";
// Firebase
import { uploadPhoto } from '../firebase-access/Firebase_Client';

const TakePhoto: React.FC = () => {
  const { photo, takePhoto } = usePhotoGallery();
  const currentUser = useContext(CurrentUser);

  const [uploadButtonEnabled, setUploadButtonEnabled] = useState<boolean>(true);

  async function handlePostPhoto() {
    await uploadPhoto(currentUser, photo!.filepath, photo!.base64Data!);
  }

  useEffect(() => {
    if (photo != undefined) { setUploadButtonEnabled(false); }
  }, [photo])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Take a photo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton
          onClick={ async () => {
              takePhoto();
          }}
        >
            Take photo
        </IonButton>
        {photo != undefined && <IonImg src={photo.webviewPath}></IonImg>}
        <IonButton 
          disabled={uploadButtonEnabled}
          onClick={async () => { await handlePostPhoto(); }}
        >
          Post Photo
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TakePhoto;