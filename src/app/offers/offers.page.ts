import { Component, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  isPromoCodeSuccessDialogOpen: boolean = false;
  confettiPieces: number[] = Array.from({ length: 9 }, (_, i) => i); // 9 confetti pieces

  constructor(private haptics: HapticsService) {}

  ngOnInit() {
    // Initialize the page
    this.setupPage();
  }

  setupPage() {
    // Add any page initialization logic here
    console.log('Offers page initialized');
  }

  promoCodeApplied(ev: any) {
    console.log('Promo code applied:', ev);

    // Add haptic feedback
    this.haptics.hapticsImpactMedium();

    // Open success modal
    this.isPromoCodeSuccessDialogOpen = true;

    // Launch enhanced confetti
    this.launchConfetti();

    // Add success sound effect (if available)
    this.playSuccessSound();
  }

  launchConfetti() {
    const duration = 3 * 1000; // 3 seconds
    const end = Date.now() + duration;

    // Enhanced confetti colors matching our theme
    const colors = [
      '#8b5cf6',
      '#3b82f6',
      '#ef4444',
      '#f59e0b',
      '#10b981',
      '#ffffff',
    ];

    // Multiple confetti bursts for more celebration
    const launchConfettiBurst = (origin: { x: number; y: number }) => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: origin,
        colors: colors,
        startVelocity: 30,
        gravity: 0.8,
        ticks: 200,
        shapes: ['circle', 'square'],
      });
    };

    // Launch confetti from multiple positions
    (function frame() {
      // Left side burst
      launchConfettiBurst({ x: 0, y: 0.5 });

      // Right side burst
      launchConfettiBurst({ x: 1, y: 0.5 });

      // Center burst
      launchConfettiBurst({ x: 0.5, y: 0.5 });

      // Top burst
      launchConfettiBurst({ x: 0.5, y: 0 });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  playSuccessSound() {
    // Add success sound effect if needed
    // This could be a simple beep or a more elaborate sound
    try {
      // Create a simple success tone
      const audioContext = new (window as any).AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Fallback if audio context is not available
      console.log('Audio context not available');
    }
  }

  okay() {
    // Add haptic feedback
    this.haptics.hapticsImpactLight();

    // Close modal
    this.isPromoCodeSuccessDialogOpen = false;

    // Add any additional logic after closing
    console.log('Success modal closed');
  }

  // Enhanced offer management methods
  getAvailableOffers() {
    // This could fetch offers from a service
    return [
      {
        code: 'SAVE20',
        discount: 20,
        description: 'Save ₹20 on orders above ₹100',
      },
      {
        code: 'WELCOME50',
        discount: 50,
        description: 'New user special - 50% off up to ₹100',
      },
      {
        code: 'BULK30',
        discount: 30,
        description: '30% off on bulk orders above ₹200',
      },
    ];
  }

  applyOffer(offerCode: string) {
    // Simulate applying an offer
    console.log(`Applying offer: ${offerCode}`);
    this.promoCodeApplied({ code: offerCode, applied: true });
  }
}
