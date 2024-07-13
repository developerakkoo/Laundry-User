import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOrderModalPage } from './add-order-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddOrderModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOrderModalPageRoutingModule {}
