import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaundryCardComponent } from 'src/app/laundry-card/laundry-card.component';
import { OfferCardComponent } from 'src/app/components/offer-card/offer-card.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { IonicModule } from '@ionic/angular';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { ProfileCardComponent } from 'src/app/components/profile-card/profile-card.component';
import { PaymentSuccessAnimationComponent } from 'src/app/components/payment-success-animation/payment-success-animation.component';
import { SubscriptionCardComponent } from 'src/app/components/subscription-card/subscription-card.component';
import { ExploreComponent } from 'src/app/components/explore/explore.component';

@NgModule({
  declarations: [ProductCardComponent, LaundryCardComponent,ProfileCardComponent,SubscriptionCardComponent,ExploreComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProductCardComponent, LaundryCardComponent,ProfileCardComponent,SubscriptionCardComponent,ExploreComponent],
})
export class SharedModule {}
