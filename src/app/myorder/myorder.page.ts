import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { HapticsService } from '../services/haptics.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

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
  ratingShopId: string = '';
  currentUserId: string = '';
  ratedOrders: Set<string> = new Set(); // Track rated orders locally

  constructor(
    private logic: LogicService,
    private haptics: HapticsService,
    private alertController: AlertController,
    private toastController: ToastController,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getCurrentUserId();
  }

  ionViewDidEnter() {
    this.getOrders();
  }

  async getCurrentUserId() {
    try {
      this.currentUserId = (await this.dataService.get('userId')) || '';
      console.log('Current User ID:', this.currentUserId);
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
  }

  getOrders() {
    this.logic.getAllUserOrders().subscribe({
      next: async (value: any) => {
        console.log(value);
        this.allOrders = value['value'];
        this.applyFilter(this.currentSegment);
        // Load rated orders after getting orders
        await this.loadRatedOrders();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  async loadRatedOrders() {
    if (!this.currentUserId) return;

    try {
      // Load all rated orders from local storage
      for (const order of this.orders) {
        if (order.shopId) {
          const ratingKey = `rating_${order.shopId}_${this.currentUserId}`;
          const ratingData = await this.dataService.get(ratingKey);

          if (ratingData) {
            const parsedData = JSON.parse(ratingData);
            // Check if the rating is for this specific order
            if (parsedData.orderId === order._id) {
              this.ratedOrders.add(order._id);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading rated orders:', error);
    }
  }

  segmentChanged(ev: any) {
    console.log(ev.detail.value);

    const seg = Number(ev.detail.value); // ion-segment gives string → convert
    this.currentSegment = seg;
    this.applyFilter(seg);
    // Reload rated orders when segment changes
    this.loadRatedOrders();
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

  openRatingDialog(orderId: string, shopId: string) {
    // Only open dialog if we have valid data
    if (!orderId || !shopId) {
      this.showErrorToast('Order information not available');
      return;
    }

    this.ratingOrderId = orderId;
    this.ratingShopId = shopId;
    this.selectedRating = 0;
    this.ratingComment = '';
    this.haptics.hapticsImpactMedium();

    // Show a simple alert to guide the user
    this.showRatingGuide();
  }

  async showRatingGuide() {
    const alert = await this.alertController.create({
      header: 'Rate Your Experience',
      message:
        'Click on the stars to select your rating, add a comment if you wish, then click Submit Rating.',
      buttons: [
        {
          text: 'Got it!',
          handler: () => {
            this.haptics.hapticsImpactLight();
          },
        },
      ],
    });
    await alert.present();
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

    if (!this.currentUserId || !this.ratingShopId) {
      this.showErrorToast('User or shop information not available');
      return;
    }

    try {
      // Prepare rating data
      const ratingData = {
        userId: this.currentUserId,
        shopId: this.ratingShopId,
        description: this.ratingComment,
        star: this.selectedRating,
      };

      console.log('Submitting rating:', ratingData);

      // Call the rating API
      this.logic.addRating(ratingData).subscribe({
        next: async (response: any) => {
          console.log('Rating submitted successfully:', response);

          if (response.success) {
            // Store rating locally to mark as rated
            await this.storeRatingLocally(
              this.ratingOrderId,
              this.ratingShopId
            );

            // Add to rated orders set
            this.ratedOrders.add(this.ratingOrderId);

            // Show success dialog
            this.showThankYouDialog();

            // Reset rating state
            this.resetRating();
          } else {
            this.showErrorToast(response.message || 'Failed to submit rating');
          }
        },
        error: async (error: HttpErrorResponse) => {
          console.error('Error submitting rating:', error);

          if (
            error.status === 400 &&
            error.error?.message?.includes('already exist')
          ) {
            this.showErrorToast('You have already rated this shop');
            // Mark as rated locally since it already exists
            await this.storeRatingLocally(
              this.ratingOrderId,
              this.ratingShopId
            );
            this.ratedOrders.add(this.ratingOrderId);
          } else {
            this.showErrorToast('Failed to submit rating. Please try again.');
          }
        },
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      this.showErrorToast('An unexpected error occurred');
    }
  }

  async storeRatingLocally(orderId: string, shopId: string) {
    try {
      const ratingKey = `rating_${shopId}_${this.currentUserId}`;
      const ratingData = {
        orderId: orderId,
        shopId: shopId,
        userId: this.currentUserId,
        timestamp: new Date().toISOString(),
      };

      await this.dataService.set(ratingKey, JSON.stringify(ratingData));
      console.log('Rating stored locally:', ratingData);
    } catch (error) {
      console.error('Error storing rating locally:', error);
    }
  }

  // Check if order has been rated (synchronous check using local set)
  isOrderRated(order: any): boolean {
    return this.ratedOrders.has(order._id);
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
          },
        },
      ],
    });

    await alert.present();
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
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
    this.ratingShopId = '';
  }

  // Check if order is completed (status 7)
  isOrderCompleted(order: any): boolean {
    return Number(order.status) === 7;
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
