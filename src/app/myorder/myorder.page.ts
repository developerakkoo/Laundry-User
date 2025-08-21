import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { HapticsService } from '../services/haptics.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.page.html',
  styleUrls: ['./myorder.page.scss'],
})
export class MyorderPage implements OnInit {
  isRecentOrder: boolean = true;

  allOrders: any[] = [];
  orders: any[] = [];
  isLoading: boolean = false;
  currentSegment: number = 1;

  // Rating properties
  selectedRating: number = 0;
  ratingComment: string = '';
  ratingOrderId: string = '';

  constructor(
    private logic: LogicService,
    private haptics: HapticsService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getOrders();
  }

  getOrders() {
    this.logic.getAllUserOrders().subscribe({
      next: (value: any) => {
        console.log(value);
        this.allOrders = value['value'];
        this.applyFilter(this.currentSegment);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  segmentChanged(ev: any) {
    console.log(ev.detail.value);

    const seg = Number(ev.detail.value); // ion-segment gives string → convert
    this.currentSegment = seg;
    this.applyFilter(seg);
  }

  applyFilter(seg: number) {
    if (seg === 1) {
      // Recent Orders: show all except status 7
      this.orders = this.allOrders.filter((o) => Number(o.status) !== 7);
    } else if (seg === 7) {
      // Previous Orders: only status 7
      this.orders = this.allOrders.filter((o) => Number(o.status) === 7);
    } else {
      // fallback (optional)
      this.orders = this.allOrders.slice();
    }
  }

  // Rating functionality
  setRating(rating: number) {
    this.selectedRating = rating;
    this.haptics.hapticsImpactLight();
  }

  openRatingDialog(orderId: string) {
    this.ratingOrderId = orderId;
    this.selectedRating = 0;
    this.ratingComment = '';
    this.haptics.hapticsImpactMedium();
  }

  async submitRating() {
    if (this.selectedRating === 0) {
      const alert = await this.alertController.create({
        header: 'Rating Required',
        message: 'Please select a rating before submitting.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      // Here you would typically send the rating to your backend
      // For now, we'll simulate the API call
      console.log('Submitting rating:', {
        orderId: this.ratingOrderId,
        rating: this.selectedRating,
        comment: this.ratingComment,
      });

      // Simulate API call delay
      setTimeout(() => {
        this.showThankYouDialog();
      }, 500);
    } catch (error) {
      console.error('Error submitting rating:', error);
      this.showErrorToast();
    }
  }

  async showThankYouDialog() {
    const alert = await this.alertController.create({
      header: 'Thank You! 🎉',
      message: `
        <div class="rating-thank-you">
          <div class="thank-you-icon">⭐</div>
          <h3>Thank you for rating us!</h3>
          <p>Your feedback helps us improve our services and provide better experiences for all our customers.</p>
          <div class="rating-summary">
            <p><strong>Your Rating:</strong> ${this.getRatingText(
              this.selectedRating
            )}</p>
            ${
              this.ratingComment
                ? `<p><strong>Your Comment:</strong> "${this.ratingComment}"</p>`
                : ''
            }
          </div>
        </div>
      `,
      cssClass: 'rating-thank-you-alert',
      buttons: [
        {
          text: 'Awesome!',
          handler: () => {
            this.haptics.hapticsImpactMedium();
            this.resetRating();
          },
        },
      ],
    });

    await alert.present();
  }

  async showErrorToast() {
    const toast = await this.toastController.create({
      message: 'Failed to submit rating. Please try again.',
      duration: 3000,
      color: 'danger',
      position: 'bottom',
    });
    await toast.present();
  }

  getRatingText(rating: number): string {
    const ratingTexts = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent',
    };
    return ratingTexts[rating as keyof typeof ratingTexts] || 'Unknown';
  }

  resetRating() {
    this.selectedRating = 0;
    this.ratingComment = '';
    this.ratingOrderId = '';
  }

  // Check if order is completed (status 7)
  isOrderCompleted(order: any): boolean {
    return Number(order.status) === 7;
  }

  // Check if order has been rated (you can add this logic based on your backend)
  isOrderRated(order: any): boolean {
    // This would typically check if the order has a rating in your backend
    // For now, we'll return false to show rating UI
    return false;
  }

  // Get rating stars for display
  getRatingStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  // Handle comment input
  onCommentInput(event: any) {
    this.ratingComment = event.target.value;
  }
}
