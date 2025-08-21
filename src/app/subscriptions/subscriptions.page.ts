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
  userSubscription: any = null; // Store user's current subscription
  isLoading: boolean = false; // Loading state

  constructor(
    private logic: LogicService,
    private toastController: ToastController,
    private storage: DataService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getAllSubscriptions();
    this.getUserPurchasedSubscription(); // Fetch user's subscription on page load
  }

  ionViewDidLeave() {}

  getAllSubscriptions() {
    this.isLoading = true;
    this.logic.getUserSubscription().subscribe({
      next: async (value: any) => {
        console.log(value);
        this.subs = value['data'];
        this.isLoading = false;
        this.highlightUserSubscription(); // Highlight user's subscription after loading
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
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
        console.log(value);
        this.razorpayCheckput(value['order']['id'], value['order']['amount']);
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

  getUserPurchasedSubscription() {
    this.logic.getSubscriptionByUserId().subscribe({
      next: async (value: any) => {
        console.log('User subscription:', value);
        if (value && value.success && value.data) {
          this.userSubscription = value.data;
          this.highlightUserSubscription(); // Highlight user's subscription
        }
      },
      error: async (error: HttpErrorResponse) => {
        console.log('Error fetching user subscription:', error);
      },
    });
  }

  // Highlight the user's current subscription
  highlightUserSubscription() {
    if (this.userSubscription && this.subs) {
      // Find the plan that matches the user's subscription
      const userPlan = this.subs.find(
        (plan: any) => plan._id === this.userSubscription.subscriptionPlanId._id
      );

      if (userPlan) {
        // Set the selected plan to the user's current subscription
        this.selectedPlanId = userPlan._id;
        this.total = userPlan.price;
        console.log('User subscription highlighted:', userPlan.name);
      }
    }
  }

  // Check if a plan is the user's current subscription
  isUserSubscription(planId: string): boolean {
    return (
      this.userSubscription &&
      this.userSubscription.subscriptionPlanId &&
      this.userSubscription.subscriptionPlanId._id === planId
    );
  }

  // Check if a plan is expired
  isSubscriptionExpired(): boolean {
    if (!this.userSubscription || !this.userSubscription.expiryDate) {
      return false;
    }

    const expiryDate = new Date(this.userSubscription.expiryDate);
    const currentDate = new Date();
    return currentDate > expiryDate;
  }

  // Get subscription status text
  getSubscriptionStatusText(): string {
    if (!this.userSubscription) {
      return '';
    }

    if (this.isSubscriptionExpired()) {
      return 'Expired';
    }

    return 'Active';
  }

  // Get subscription expiry date
  getSubscriptionExpiryDate(): string {
    if (!this.userSubscription || !this.userSubscription.expiryDate) {
      return '';
    }

    return this.userSubscription.expiryDate;
  }

  getDefaultDescription(validity: number): string {
    switch (validity) {
      case 1:
        return 'Perfect for trying out our premium services. Get access to all features for one month.';
      case 3:
        return 'Our most popular choice! Save money with 3 months of premium access and exclusive benefits.';
      case 6:
        return 'Great value for long-term users. Enjoy 6 months of premium features with additional savings.';
      case 12:
        return 'Best long-term value! Get a full year of premium access with maximum savings and priority support.';
      default:
        return 'Premium subscription plan with exclusive features and benefits.';
    }
  }

  getFeatures(validity: number): string[] {
    const baseFeatures = [
      'Premium laundry services',
      'Priority customer support',
      'Exclusive discounts',
      'Free delivery & pickup',
    ];

    if (validity >= 3) {
      baseFeatures.push('Loyalty rewards program');
    }

    if (validity >= 6) {
      baseFeatures.push('VIP customer status');
      baseFeatures.push('Special seasonal offers');
    }

    if (validity >= 12) {
      baseFeatures.push('Annual bonus credits');
      baseFeatures.push('Dedicated account manager');
    }

    return baseFeatures;
  }

  createSubscription(id: any) {
    let paymentDetails = `{paymentId: ${id},success: true}`;
    this.logic
      .purchaseSubscription(this.selectedPlanId, paymentDetails.toString())
      .subscribe({
        next: async (value: any) => {
          console.log(value);
          this.presentToast();
          this.getUserPurchasedSubscription(); // Refresh user subscription after purchase
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}
