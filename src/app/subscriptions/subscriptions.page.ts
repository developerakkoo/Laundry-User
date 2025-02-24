import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
declare var Razorpay: any;

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {
  subs: any;
  selectedPlanId: string = '';
  total: any;
  constructor(
    private logic: LogicService,
    private toastController: ToastController,
    private storage: DataService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getAllSubscriptions();
  }

  ionViewDidLeave() {}

  getAllSubscriptions() {
    this.logic.getUserSubscription().subscribe({
      next: async (value: any) => {
        console.log(value);
        this.subs = value['data'];
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have successfully purchased the subscription.',
      duration: 2000,
      animated: true,
      mode: 'ios',
    });
    toast.present();
  }
  purchase() {
    console.log(this.selectedPlanId);
    console.log(this.total);
    this.checkout();
  }

  radioButtonEvent(event: any) {
    this.selectedPlanId = event.detail.value;

    // Find the selected plan object
    const selectedPlan = this.subs.find(
      (plan: any) => plan._id === this.selectedPlanId
    );

    if (selectedPlan) {
      this.total = selectedPlan.price;
      console.log('Selected Plan ID:', this.selectedPlanId);
      console.log('Selected Price:', this.total);
    }
  }

  checkout() {
    this.logic.checkout(this.total).subscribe({
      next: async (value: any) => {
        console.log(value['data']['id']);
        this.razorpayCheckput(value['data']['id'], value['data']['amount']);
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
        this.createSubscription(orderId);
        // this.purchase();
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

  getUserPurchasedSubscription(){
    this.logic.getSubscriptionByUserId()
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }
  createSubscription(id:any){
    let paymentDetails =  `{paymentId: ${id},success: true}`
    this.logic.purchaseSubscription(this.selectedPlanId, paymentDetails.toString())
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.presentToast();
        this.getUserPurchasedSubscription();
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })

  }
}
