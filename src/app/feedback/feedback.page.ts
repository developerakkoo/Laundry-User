import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  selectedFeedback: string = '';
  additionalFeedback: string = '';
  feedbackSubmitted: boolean = false;
  showRatingPrompt: boolean = false;
  isTextareaFocused: boolean = false;
  platformStoreName: string = 'App Store';

  constructor(private platform: Platform, private haptics: HapticsService) {}

  ngOnInit() {
    this.detectPlatform();
  }

  detectPlatform() {
    if (this.platform.is('android')) {
      this.platformStoreName = 'Google Play Store';
    } else if (this.platform.is('ios')) {
      this.platformStoreName = 'App Store';
    }
  }

  setFeedback(feedback: string) {
    this.haptics.hapticsImpactLight();
    this.selectedFeedback = feedback;

    // Show rating prompt for positive feedback
    if (feedback === 'excellent' || feedback === 'good') {
      this.showRatingPrompt = true;
    }
  }

  onTextareaFocus() {
    this.isTextareaFocused = true;
  }

  onTextareaBlur() {
    this.isTextareaFocused = false;
  }

  async submitFeedback() {
    if (!this.selectedFeedback) return;

    this.haptics.hapticsImpactMedium();

    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', {
      rating: this.selectedFeedback,
      additionalFeedback: this.additionalFeedback,
    });

    // Show success state
    this.feedbackSubmitted = true;

    // Trigger success animation
    setTimeout(() => {
      this.haptics.hapticsImpactLight();
    }, 500);
  }

  async rateOnStore() {
    this.haptics.hapticsImpactMedium();

    try {
      if (this.platform.is('android')) {
        // Open Google Play Store
        window.open('market://details?id=com.yourapp.id', '_system');
      } else if (this.platform.is('ios')) {
        // Open App Store
        window.open('itms-apps://itunes.apple.com/app/your-app-id', '_system');
      }
    } catch (error) {
      console.error('Error opening store:', error);
    }
  }

  maybeLater() {
    this.haptics.hapticsImpactLight();
    this.showRatingPrompt = false;
  }

  goBack() {
    this.haptics.hapticsImpactLight();
    // Navigate back to the previous page
    window.history.back();
  }
}
