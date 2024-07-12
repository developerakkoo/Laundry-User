import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {

  interval:any;
  constructor(private router:Router) { }

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.interval = setInterval(() =>{
      this.router.navigate(['tabs', 'tab1'],{skipLocationChange:true, replaceUrl:true})
    },4000)
  }

  ionViewDidLeave(){
    clearInterval(this.interval);
  }
}
