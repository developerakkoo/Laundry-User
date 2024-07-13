import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HapticsService } from 'src/app/services/haptics.service';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
})
export class OfferCardComponent  implements OnInit {
  @Input() promoCode: string = 'SAVE20';
  @Input() description: string = 'Get 20% off on your next purchase. Use the code at checkout.';
  @Input() details: string = 'Valid until: 31st December 2024\nTerms and conditions apply.';
  @Output() appliedEvent = new EventEmitter<any>();
 
  constructor(private haptics: HapticsService) { }

  ngOnInit() {}
  applyCode() {
    this.haptics.hapticsImpactLight();
    console.log(`Promo code ${this.promoCode} applied!`);
    this.appliedEvent.emit(true);
  }
}
