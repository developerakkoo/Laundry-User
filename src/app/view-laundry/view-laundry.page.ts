import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  IonicSlides,
  ModalController,
} from '@ionic/angular';
import { HapticsService } from '../services/haptics.service';
import { LogicService } from '../services/logic.service';

@Component({
  selector: 'app-view-laundry',
  templateUrl: './view-laundry.page.html',
  styleUrls: ['./view-laundry.page.scss'],
})
export class ViewLaundryPage implements OnInit {
  swiperModules = [IonicSlides];
  title: any;
  categoryId: any;
  allLaundries: any[] = [];
  userId: any;
  isLoading: boolean = false;
  isFilterOpen: boolean = false;
  selectedFilter: string = '';

  laundryFilter: any = { name: '' };

  constructor(
    private router: Router,
    private haptics: HapticsService,
    private route: ActivatedRoute,
    private logic: LogicService,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) {
    this.title = this.route.snapshot.paramMap.get('name');
    this.categoryId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {}

  async getUserId() {
    this.userId = await this.logic.getUserId();
    console.log(`UserId in tab1 page ${this.userId}`);
  }

  ionViewDidEnter() {
    this.getUserId();
    this.getAllLaundries();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getAllLaundries();
      event.target.complete();
    }, 500);
  }

  getAllLaundries() {
    this.logic.getAllLaundries().subscribe({
      next: async (value: any) => {
        console.log('Shops Fetched!');
        console.log(value);
        this.allLaundries = value['data']['content'];
      },
      error: async (error: any) => {
        console.log(error);
      },
    });
  }

  getLaundriesById() {
    // this.isLoading = true;
    // setTimeout(() => {
    //   this.isLoading = false;
    //   console.log('1');
    // }, 2000);

    // laundryByCategory
    this.logic.laundryByCategory$.subscribe({
      next: async (value: any) => {
        console.log('Fetching all laundries');
        console.log(value);
        this.allLaundries = value['data'];
      },
      error: async (error: any) => {
        console.log(error);
      },
    });
  }

  applyFilter(filter: string) {
    this.haptics.hapticsImpactLight();
    this.selectedFilter = filter; // Set the active filter
    this.getAllLaundries();
  }

  openFilterModal() {
    console.log('Opening filter modal, current state:', this.isFilterOpen);
    this.isFilterOpen = !this.isFilterOpen;
    console.log('New modal state:', this.isFilterOpen);
  }

  closeFilterModal() {
    console.log('Closing filter modal');
    this.isFilterOpen = false;
  }

  onSearchChange(ev: any) {}

  openPage(page: string) {
    this.router.navigate([page]);
  }
}
