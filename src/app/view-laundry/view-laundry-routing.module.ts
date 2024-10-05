import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLaundryPage } from './view-laundry.page';

const routes: Routes = [
  {
    path: '',
    component: ViewLaundryPage
  },
  {
    path: 'add/:id',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'add-order-modal',
    loadChildren: () => import('./add-order-modal/add-order-modal.module').then( m => m.AddOrderModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLaundryPageRoutingModule {}
