import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {

  interval:any;
  constructor(private router:Router,
              private haptics:HapticsService
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.interval = setInterval(() =>{
      this.haptics.hapticsImpactLight();
      this.router.navigate(['tabs','tabs', 'tab3'],{skipLocationChange:true, replaceUrl:true})
    },4000)
  }

  ionViewDidLeave(){
    clearInterval(this.interval);
  }
}
