import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  webviewPath?: string;
  base64Image: string;

  constructor() { }

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 60,
      width: 800, // Ancho deseado de la imagen
      height: 600,
    });
    this.webviewPath= capturedPhoto.webPath;
    this.convertToBase64();
  }

  public convertToBase64() {
    const img =""+this.webviewPath;
    fetch(img)
  .then(res => res.blob())
  .then(blob => {
    // Convert the blob to base64 format
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      this.base64Image= reader.result as string; 
    }
  });
  }

}