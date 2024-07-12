import { Component, Input, OnInit } from '@angular/core';

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
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  constructor() { }

  ngOnInit() {}

}
