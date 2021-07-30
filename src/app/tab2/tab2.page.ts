import { Component } from '@angular/core';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public dataNascimento: string;
  public dias: number;
  public meses: number;
  public anos: number;

  constructor(public Alert: AlertController) {}

  public calcular(): void {
    if (this.dataNascimento){
      const dataNascimento = moment(this.dataNascimento);
      this.dias = moment().diff(dataNascimento, 'days');
      this.meses = moment().diff(dataNascimento, 'months');
      this.anos = moment().diff(dataNascimento, 'years');
    }
    else{
        this.Alert.create({
          header: 'Error',
          message: 'Insira uma data válida!',
          buttons: ['Ok']
        }).then(res => {
          res.present();
        });
    }
  }
}
