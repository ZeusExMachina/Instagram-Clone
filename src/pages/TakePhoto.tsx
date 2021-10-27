import React, { useContext, useEffect, useState } from 'react'
import { useIonToast } from '@ionic/react';
// Components
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
// States
import { CurrentUser } from '../states/CurrentUser';
import { UploadPhoto } from '../states/UserPhotos';
// Hooks
import { usePhotoGallery } from "../hooks/usePhotoGallery";
// Appearance
import './TakePhoto.css'

const TakePhoto: React.FC = () => {
  const {photo, setPhoto, takePhoto} = usePhotoGallery();
  const [present, dismiss] = useIonToast();
  const currentUser = useContext(CurrentUser);
  const uploadPhoto = useContext(UploadPhoto);

  const [uploadButtonDisabled, setUploadButtonDisabled] = useState<boolean>(true);

  async function handlePostPhoto() {
    await uploadPhoto(currentUser, photo!.filepath, photo!.base64Data!);
    setPhoto(undefined);
    setUploadButtonDisabled(true)

    present({
      buttons: [{ text: 'OK', handler: () => dismiss() }],
      message: "You just uploaded a photo!",
      duration: 5000
    })
  }

  useEffect(() => {
    if (photo != undefined) { setUploadButtonDisabled(false); }
  }, [photo])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="takePhotoHeaderText">Take a photo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="takePhotoImageContainer">
          {photo != undefined && <IonImg src={photo.webviewPath}></IonImg>}
        </div>
        <div className="takePhotoButtonArray">
          <IonButton
            onClick={ async () => {
                takePhoto();
            }}
          >
              Take photo
          </IonButton>
          <IonButton 
            disabled={uploadButtonDisabled}
            onClick={async () => { await handlePostPhoto(); }}
          >
            Post Photo
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TakePhoto;