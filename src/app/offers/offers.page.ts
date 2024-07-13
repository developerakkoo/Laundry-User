import { Component, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  isPromoCodeSuccessDialogOpen:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  promoCodeApplied(ev:any){
    console.log(ev);
    this.isPromoCodeSuccessDialogOpen = true;
    this.launchConfetti();
  }
  launchConfetti() {
    const duration = 2 * 1000; // 2 seconds
    const end = Date.now() + duration;

    const colors = ['#8F35C7', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
  okay(){
    this.isPromoCodeSuccessDialogOpen = false;
  }
}
