import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOrderModalPageRoutingModule } from './add-order-modal-routing.module';

import { AddOrderModalPage } from './add-order-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddOrderModalPageRoutingModule
  ],
  declarations: [AddOrderModalPage]
})
export class AddOrderModalPageModule {}
