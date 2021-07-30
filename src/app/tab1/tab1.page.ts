import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public descricao: string;
  public valor: number;
  public montante = 0;

  public items = [];

  constructor(public storage: Storage) {
    this.createDatabase();
    this.getAll();
  }

  async createDatabase() {
    await this.storage.create();
  }

  public async salvar(valor: number, descricao: string): Promise<void> {

    if (this.descricao && this.valor) {
      this.montante += valor;
      this.items.push({
        valor,
        descricao
      });
      await this.storage.set('fluxo', this.items);
      await this.storage.set('montante', this.montante);
      await this.getAll();
      this.valor = null;
      this.descricao = null;
    }
  }

  private getAll(): void {
    this.storage.get('fluxo').then(data => {
      this.items = (data === null) ? [] : data;
    });
    this.storage.get('montante').then(data => {
      this.montante = (data === null) ? 0 : data;
    });
  }

  public apagarTudo(): void {
    this.storage.clear();
    this.items = [];
    this.montante = 0;
  }
}
