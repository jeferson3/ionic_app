import {Injectable} from '@angular/core';
import {Camera, CameraPhoto, CameraResultType, CameraSource} from '@capacitor/camera';
import {Filesystem, Directory} from '@capacitor/filesystem';



@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];

  constructor() { }

  takePicture = async () => {

    const image = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    });
    // this.photos.unshift({
    //   filepath: 'soon...',
    //   webviewPath: image.webPath
    // });
    const savedImageFile = await this.savePicture(image);
    this.photos.unshift(savedImageFile);
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  deletarFoto(foto: Photo){
    let index = this.photos.indexOf(foto);
    this.photos.splice(index, 1);
  }

  deletarTodas(){
    this.photos = [];
  }
}
export interface Photo {
  filepath: string;
  webviewPath: string;
}
