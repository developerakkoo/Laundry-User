import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPageRoutingModule } from './add-routing.module';

import { AddPage } from './add.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FilterPipeModule,
    IonicModule,
    AddPageRoutingModule,
  ],
  declarations: [AddPage],
})
export class AddPageModule {}
