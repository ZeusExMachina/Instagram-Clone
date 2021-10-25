import { useState, useEffect } from "react";

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  base64Data?: string;
}

export function usePhotoGallery() {
  const [photo, setPhoto] = useState<UserPhoto>();

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = new Date().getTime() + ".jpeg";
    const newPhotos : UserPhoto = {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath,
      base64Data: await base64FromPath(cameraPhoto.webPath!)
    }
    setPhoto(newPhotos);
  };

  // console.log(photo);

  return {
    photo,
    takePhoto,

  };
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string')
      }
    };
    reader.readAsDataURL(blob);
  });
}