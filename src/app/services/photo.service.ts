import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  webviewPath?: string;
  base64Image: string;

  constructor() { }


  public convertToBase64() {
    console.log(this.webviewPath);
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
