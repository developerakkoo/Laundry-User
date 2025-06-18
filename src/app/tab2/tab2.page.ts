import { Component } from '@angular/core';
import { HapticsService } from '../services/haptics.service';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { LogicService } from '../services/logic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Position } from '@capacitor/geolocation';
import { Observable, Subscription } from 'rxjs';
import { AddressPage } from '../address/address.page';
import { DataService } from '../services/data.service';
import confetti from 'canvas-confetti';
import moment from 'moment';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
declare var Razorpay: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  products: any[] = [];
  offers: any[] = [];
  offerFirst: any;
  totalprice: any;
  userId: any;
  addressId: any;
  shopId: any;
  currentAddress: any;
  cart: any[] = [];
  address: any;

  isUserProfileUpdated: any;

  orderType!: number;
  subtotal: number = 0;
  total: number = 0;
  deliveryCharges: number = 50;
  handlingFeed: number = 50;
  gstCharges: number = 100;

  addMoreItemsWorthAmount: number = 0;
  promoCode: string = '';
  promoCodeInputFillType: string = 'outline';
  isPromoCodeApplied: boolean = false;
  isPromoCodeSuccessDialogOpen: boolean = false;

  priceDetailsObject: any = {};
  coordinates!: Position;
  defaultAddress: any;

  shopLat: any;
  shopLng: any;

  offerSubscription: Subscription = new Subscription();
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
    this.getData();
  }

  ionViewDidLeave() {
    this.getCart();
    this.getData();
  }

  async getData() {
    this.isUserProfileUpdated = await this.storage.get('profileUpdated');
    console.log(this.isUserProfileUpdated + 'Profile Update status');
  }
  goToHome() {
    this.router.navigate(['tabs', 'tabs', 'tab1']);
  }
  async getAddress() {
    this.address = await this.storage.get('address');
    console.log('Below is the Address');

    console.log(this.address['_id']);
    this.addressId = this.address['_id'];
  }
  getCart() {
    this.logic.getCart().subscribe({
      next: async (value: any) => {
        console.log(value);
        this.shopId = value['data']['shopId']['_id'];
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

  async presentUserProfileUpdateSheet() {
    const modal = await this.modalController.create({
      component: EditProfilePage,
      animated: true,
      handle: true,
      mode: 'ios',
      initialBreakpoint: 0.75,
      componentProps: { value: 123 },
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data);
    this.getData();
    this.checkout();
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
            this.orderType = 0;
            if (this.isUserProfileUpdated == '0') {
              this.presentUserProfileUpdateSheet();
            } else {
              this.checkout();
            }
          },
        },
        {
          text: 'Express Delivery(One day delivery)',
          icon: 'rocket',
          handler: () => {
            console.log('Share clicked');
            this.haptics.hapticsImpactLight();
            this.orderType = 1;
            if (this.isUserProfileUpdated == '0') {
              this.presentUserProfileUpdateSheet();
            } else {
              this.checkout();
            }
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

  async getAllOffers(minOrderAmount: number) {
    console.log(minOrderAmount);

    this.offerSubscription = this.logic.getAllOffers().subscribe({
      next: async (value: any) => {
        console.log('Loading All Offers');

        console.log(value['data']);
        this.offers = value['data'];
        this.offerFirst = this.offers.filter((offer: any) => {
          return Number(minOrderAmount) > offer.minOrderAmount;
        });
        console.log(this.offerFirst);
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  applyOffer() {
    console.log(this.offerFirst[0]['code']);
    this.haptics.hapticsImpactMedium();
    this.isPromoCodeSuccessDialogOpen = true;

    this.launchConfetti();
    this.calculateTotalAmountForPayment(this.offerFirst[0]['code']);
  }

  removeOffer() {
    this.calculateTotalAmountForPayment('');
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
          this.getAllOffers(this.subtotal);

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
        this.placeOrder();
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

  async placeOrder() {
    const pickupTime = moment().add(2, 'hours').format('hA');
    const dropoffTime = moment().add(12, 'hours').format('hA');
    this.logic
      .placeOrder(
        this.shopId,
        this.addressId,
        pickupTime,
        dropoffTime,
        false,
        this.priceDetailsObject,
        this.orderType,
        this.products
      )
      .subscribe({
        next: async (value: any) => {
          console.log(value);
          this.haptics.hapticsImpactLight();
          this.router.navigate(['payment-success']);
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
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

  launchConfetti() {
    const duration = 2 * 1000; // 2 seconds
    const end = Date.now() + duration;

    const colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 30,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 30,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    setTimeout(() => {
      this.isPromoCodeSuccessDialogOpen = false;
      this.haptics.hapticsImpactLight();
    }, 2000);
  }
}
