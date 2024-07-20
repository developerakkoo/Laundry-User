import { Component, Input, OnInit } from '@angular/core';
import { HapticsService } from 'src/app/services/haptics.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent  implements OnInit {
  @Input() productImageUrl!: string;
  @Input() productName!: string;
  @Input() productPrice!: string;
  
  quantity: number = 1;
  selectedOption: string = 'wash';

  incrementQuantity() {
    this.quantity++;
    this.haptics.hapticsImpactLight();
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.haptics.hapticsImpactLight();
    }
  }
  constructor(private haptics: HapticsService) { }

  ngOnInit() {}

}
