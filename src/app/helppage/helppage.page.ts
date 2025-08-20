import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-helppage',
  templateUrl: './helppage.page.html',
  styleUrls: ['./helppage.page.scss'],
})
export class HelppagePage implements OnInit {
  openFaq: number | null = null;

  constructor(private router: Router, private haptics: HapticsService) {}

  ngOnInit() {}

  openPage(page: string) {
    this.haptics.hapticsImpactLight();
    this.router.navigate([page]);
  }

  callSupport() {
    this.haptics.hapticsImpactMedium();
    // Open phone dialer with support number
    window.open('tel:+919876543210', '_self');
  }

  emailSupport() {
    this.haptics.hapticsImpactMedium();
    // Open email client with support email
    window.open(
      'mailto:support@laundryapp.com?subject=Laundry App Support Request',
      '_self'
    );
  }

  whatsappSupport() {
    this.haptics.hapticsImpactMedium();
    // Open WhatsApp with support number
    const message = encodeURIComponent(
      'Hi! I need help with my laundry order.'
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  }

  toggleFaq(faqId: number) {
    this.haptics.hapticsImpactLight();
    if (this.openFaq === faqId) {
      this.openFaq = null;
    } else {
      this.openFaq = faqId;
    }
  }
}
