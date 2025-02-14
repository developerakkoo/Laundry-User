import { Component } from '@angular/core';
import { HapticsService } from '../services/haptics.service';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { LogicService } from '../services/logic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Position } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { AddressPage } from '../address/address.page';
import { DataService } from '../services/data.service';
declare var Razorpay: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  products: any[] = [];
  totalprice: any;
  userId: any;
  addressId: any;
  currentAddress: any;
  cart: any[] = [];
  address: any;

  subtotal: number = 0;
  total: number = 0;
  deliveryCharges: number = 50;
  handlingFeed: number = 50;
  gstCharges: number = 100;

  addMoreItemsWorthAmount: number = 0;
  promoCode: string = '';
  promoCodeInputFillType: string = 'outline';
  isPromoCodeApplied: boolean = false;

  priceDetailsObject: any = {};
  coordinates!: Position;
  defaultAddress: any;

  shopLat: any;
  shopLng: any;
  constructor(
    private haptics: HapticsService,
    private router: Router,
    private logic: LogicService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private storage: DataService
  ) {}

  ionViewDidEnter() {
    this.getCart();
    this.getAddress();
  }

  async getAddress() {
    this.address = await this.storage.get('address');
    console.log(this.address['address']);
  }
  getCart() {
    this.logic.getCart().subscribe({
      next: async (value: any) => {
        console.log(value);
        this.products = value['data']['products'];
        this.totalprice = value['data']['totalPrice'];
        this.calculateTotalAmountForPayment('');
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
  checkout() {
    this.logic.checkout(this.total).subscribe({
      next: async (value: any) => {
        console.log(value);
        this.razorpayCheckput(value['data']['id'], value['data']['amount']);
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
  addItem(ev: any) {
    console.log(ev);

    this.logic.addToCart(ev.id, 1, ev.type).subscribe({
      next: async (value: any) => {
        console.log(value);
        this.getCart();
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
    // this.items.push({ ...data });
    // this.newItem = { item: '', quantity: 0, note: '' };
    // console.log(this.items);
    // this.presentToast("Item Added to cart", 2000, "primary");
    this.haptics.hapticsImpactLight();
  }

  deleteItem(ev: any) {
    this.logic.removeFromCart(ev.id, 1).subscribe({
      next: async (value: any) => {
        console.log(value);
        this.haptics.hapticsVibrate();
        this.getCart();
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
        this.haptics.hapticsVibrate();
      },
    });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose Delivery Option',
      animated: true,
      backdropDismiss: true,
      mode: 'ios',
      buttons: [
        {
          text: 'Normal Delivery(1-2 Days)',
          icon: 'sunny',
          role: 'selected',
          handler: () => {
            console.log('Delete clicked');
            this.haptics.hapticsImpactLight();
            this.checkout();
          },
        },
        {
          text: 'Express Delivery(One day delivery)',
          icon: 'rocket',
          handler: () => {
            console.log('Share clicked');
            this.haptics.hapticsImpactLight();
            this.checkout();

            // this.router.navigate(['payment-success']);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  calculateTotalAmountForPayment(promoCode: string) {
    this.logic
      .calculateCartAmount(
        promoCode
        // this.coordinates.coords.latitude,
        // this.coordinates.coords.longitude,
        // this.shopLat,
        // this.shopLng
      )
      .subscribe({
        next: async (value: any) => {
          console.log(value);
          this.priceDetailsObject = value['data'];
          this.deliveryCharges = value['data']['deliveryCharges'];
          this.gstCharges = value['data']['gstAmount'];
          this.handlingFeed = value['data']['platformFee'];
          this.total = value['data']['totalAmountToPay'];
          this.subtotal = value['data']['subtotal'];
          if (this.subtotal < 500) {
            this.addMoreItemsWorthAmount = 500 - this.subtotal;
          }
          let promocode = value['data']['promoCodeId'];
          if (promocode == null) {
            this.isPromoCodeApplied = false;
            this.promoCodeInputFillType = 'outline';
          } else if (promocode != null) {
            this.isPromoCodeApplied = true;
            this.promoCodeInputFillType = 'solid';
          }
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  razorpayCheckput(orderId: any, amount: any) {
    var options = {
      key: 'rzp_test_q92KbX0ZwFyaN0', // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Breezy', //your business name
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: (response: any) => {
        console.log('Payment Success');
        this.router.navigate(['payment-success']);

        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        //  this.placeOrder(response.razorpay_payment_id,"RAZORPAY");
      },
      // "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
      //     "name": "Gaurav Kumar", //your customer's name
      //     "email": "gaurav.kumar@example.com",
      //     "contact": "9000090000"  //Provide the customer's phone number for better conversion rates
      // },
      // "notes": {
      //     "address": "Razorpay Corporate Office"
      // },
      theme: {
        color: '#7e2faf',
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response: any) {
      console.log('Payment Error');

      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  }

  async openModalAddress() {
    const modal = await this.modalController.create({
      component: AddressPage,
      componentProps: { value: this.coordinates },
    });

    await modal.present();
    const data = await modal.onDidDismiss();
    console.log(data);
    this.getAddress();
    // this.addressId = data['data']['_id'];
    // this.userId = data['data']['userId'];
    // this.currentAddress = data['data'];
    // this.coordinates = data['data']['coordinates'];
  }
}
