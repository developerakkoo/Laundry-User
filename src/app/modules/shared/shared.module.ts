import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaundryCardComponent } from 'src/app/laundry-card/laundry-card.component';
import { OfferCardComponent } from 'src/app/components/offer-card/offer-card.component';



@NgModule({
  declarations: [LaundryCardComponent],
  imports: [
    CommonModule
  ],
  exports:[LaundryCardComponent]
})
export class SharedModule { }
