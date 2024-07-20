import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(private router:Router,
              private haptics: HapticsService
  ) { }

  ngOnInit() {
  }

  openPage(page:string){
    this.haptics.hapticsImpactLight();
    this.router.navigate([page]);
  }

}
