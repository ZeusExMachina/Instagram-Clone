// 3rd-party Imports
import React, { useContext, useEffect, useState } from 'react'
// Components
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
// States
import { CurrentUser } from '../states/CurrentUser';
import { UploadPhoto } from '../states/UserPhotos';
// Hooks
import { usePhotoGallery } from "../hooks/usePhotoGallery";

const TakePhoto: React.FC = () => {
  const { photo, setPhoto, takePhoto } = usePhotoGallery();
  const currentUser = useContext(CurrentUser);
  const uploadPhoto = useContext(UploadPhoto);

  const [uploadButtonDisabled, setUploadButtonDisabled] = useState<boolean>(true);

  async function handlePostPhoto() {
    await uploadPhoto(currentUser, photo!.filepath, photo!.base64Data!);
    setPhoto(undefined);
    setUploadButtonDisabled(true)
  }

  useEffect(() => {
    if (photo != undefined) { setUploadButtonDisabled(false); }
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
          disabled={uploadButtonDisabled}
          onClick={async () => { await handlePostPhoto(); }}
        >
          Post Photo
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TakePhoto;