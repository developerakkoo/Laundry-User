import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HapticsService } from 'src/app/services/haptics.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent  implements OnInit {
  @Input() productImageUrl!: string;
  @Input() productName!: string;
  @Input() desc!: string;
  @Input() productPrice!: string;
  @Input() _id!: string;
  @Input() quantityAcceptedIn!: number; // 0 = item 1 = kg
  
  quantity: number = 1;
  selectedOption: string = 'wash';

  incrementQuantity() {
    this.quantity++;
    this.presentToast("Item Added to cart", 2000, "primary");

    this.haptics.hapticsImpactLight();
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.haptics.hapticsImpactLight();
    }
  }
  constructor(private haptics: HapticsService,
              private toastController: ToastController,
  ) { }

  ngOnInit() {}
  async presentToast(msg:string, duration:any, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      swipeGesture:'vertical',
      duration: duration,
      color: color,
      position:'bottom',
      animated:true,
      icon:'rocket',
      mode:'ios'
    });
    toast.present();
  }

  add(){
    
  }
}
