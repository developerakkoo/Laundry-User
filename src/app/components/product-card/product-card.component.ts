import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  
  @ Input() quantity: number = 0;
  selectedOption: string = 'wash';

 @Output() quantityEvent = new EventEmitter();
 @Output() quantityEventRemove = new EventEmitter();
  incrementQuantity() {
    this.quantity++;
    this.quantityEvent.emit({quantity: this.quantity, id:this._id,type: this.quantityAcceptedIn});
    this.haptics.hapticsImpactLight();
  }

  decrementQuantity() {
    if (this.quantity >=0 ) {
      this.quantity--;
    this.quantityEventRemove.emit({quantity: this.quantity, id:this._id, type: this.quantityAcceptedIn});
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


}
