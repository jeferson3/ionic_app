import { Component, OnInit } from '@angular/core';
import {Photo, PhotoService} from '../services/photo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
  }

  async tirarFoto(){
    await this.photoService.takePicture();
  }

  apagarFoto(photo: Photo){
    this.photoService.deletarFoto(photo);
  }

  deletarTodasFotos(){
    this.photoService.deletarTodas();
  }

}
