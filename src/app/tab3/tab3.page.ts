import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HapticsService } from '../services/haptics.service';
import { LogicService } from '../services/logic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  getUserProfileSubscription: Subscription = new Subscription();

  userProfile:any = {};
  constructor(
    private router: Router,
    private haptics: HapticsService,
    private logic: LogicService,
    private storage: DataService
  ) {}

  ionViewDidEnter() {
    this.getUserProfile();
  }

  ionViewDidLeave() {
    this.getUserProfileSubscription.unsubscribe();
  }
  openPage(page: string) {
    this.haptics.hapticsImpactLight();
    this.router.navigate([page]);
  }

  async getUserProfile() {
    this.getUserProfileSubscription = this.logic.getUserProfile().subscribe({
      next: (value: any) => {
        console.log(value);
        this.userProfile = value['data'];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

 async logout(){
  this.logic.logout()
  .subscribe({
    next:async(value:any) =>{
      console.log(value);
      await this.storage.clearAll();

      this.router.navigate([''])
    },
    error:async(error:HttpErrorResponse) =>{
      console.log(error);
      
    }
  })
  }
}
