import { Component, Input, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-payment-success-animation',
  templateUrl: './payment-success-animation.component.html',
  styleUrls: ['./payment-success-animation.component.scss'],
})
export class PaymentSuccessAnimationComponent implements OnInit {
  @Input() text!:string;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
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
}
