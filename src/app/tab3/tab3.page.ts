import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private router: Router,
              private haptics: HapticsService
  ) {}


  openPage(page:string){
    this.haptics.hapticsImpactLight();
    this.router.navigate([page]);
  }

}
