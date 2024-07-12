import { Component } from '@angular/core';
import { HapticsService } from '../services/haptics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private haptics: HapticsService,
              private router: Router
  ) {}


  openPage(page:string){
    this.router.navigate([page]);
    this.haptics.hapticsImpactLight();
  }
}
