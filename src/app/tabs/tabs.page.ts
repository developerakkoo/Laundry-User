import { Component, OnInit } from '@angular/core';
import { HapticsService } from '../services/haptics.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private haptics: HapticsService, private platform: Platform) {}

  ngOnInit() {
    // Add platform-specific enhancements
    this.setupPlatformSpecifics();
  }

  haptic() {
    this.haptics.hapticsImpactLight();
  }

  private setupPlatformSpecifics() {
    // Add iOS-specific smooth scrolling
    if (this.platform.is('ios')) {
      document.documentElement.style.setProperty(
        '--ion-safe-area-bottom',
        '0px'
      );
    }

    // Add Android-specific enhancements
    if (this.platform.is('android')) {
      // Android-specific styling if needed
    }
  }

  // Enhanced haptic feedback for tab selection
  onTabChange(event: any) {
    // Add medium haptic feedback for tab changes
    this.haptics.hapticsImpactMedium();

    // You can add additional logic here for tab change events
    console.log('Tab changed to:', event.tab);
  }
}
