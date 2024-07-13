import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewLaundryPageRoutingModule } from './view-laundry-routing.module';

import { ViewLaundryPage } from './view-laundry.page';
import { SharedModule } from '../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewLaundryPageRoutingModule,
    SharedModule
  ],
  declarations: [ViewLaundryPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ViewLaundryPageModule {}
