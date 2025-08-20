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

  userProfile: any = {
    name: 'Hello User!',
    phoneNumber: '+91 98765 43210',
    profileImage: 'assets/icon/user.png',
    totalOrders: 0,
    activeSubscriptions: 0,
    loyaltyPoints: 0,
  };

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
        if (value && value['data']) {
          this.userProfile = {
            ...this.userProfile, // Keep default values
            ...value['data'], // Override with actual data
          };
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  async logout() {
    this.logic.logout().subscribe({
      next: async (value: any) => {
        console.log(value);
        await this.storage.clearAll();
        this.router.navigate(['']);
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
