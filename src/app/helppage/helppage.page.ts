import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-helppage',
  templateUrl: './helppage.page.html',
  styleUrls: ['./helppage.page.scss'],
})
export class HelppagePage implements OnInit {

  constructor(private router: Router,
              private haptics: HapticsService,
  ) { }

  ngOnInit() {
  }

  openPage(page:string){
    this.haptics.hapticsImpactLight();
    this.router.navigate([page]);
  }
}
