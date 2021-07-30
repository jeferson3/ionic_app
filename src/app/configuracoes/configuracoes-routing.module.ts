import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracoesPage } from './configuracoes.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracoesPage
  },
  {
    path: 'wifi',
    loadChildren: () => import('./wifi/wifi.module').then( m => m.WifiPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracoesPageRoutingModule {}
