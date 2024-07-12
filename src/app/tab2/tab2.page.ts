import { Component } from '@angular/core';
import { HapticsService } from '../services/haptics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  totalprice:number = 1200;
  constructor(private haptics:HapticsService,
              private router: Router
  ) {}


  checkout(){
    this.haptics.hapticsImpactLight();
    this.router.navigate(['payment-success']);
  }
}
