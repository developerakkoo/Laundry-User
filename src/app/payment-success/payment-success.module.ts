import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSuccessPageRoutingModule } from './payment-success-routing.module';

import { PaymentSuccessPage } from './payment-success.page';
import { PaymentSuccessAnimationComponent } from '../components/payment-success-animation/payment-success-animation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentSuccessPageRoutingModule
  ],
  declarations: [PaymentSuccessPage,PaymentSuccessAnimationComponent]
})
export class PaymentSuccessPageModule {}
