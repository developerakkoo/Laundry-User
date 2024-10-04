import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, IonicSlides } from '@ionic/angular';
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
  allLaundries:any[] =[];


  isLoading: boolean = false;
  isFilterOpen: boolean = true;
  constructor(
    private router: Router,
    private haptics: HapticsService,
    private route: ActivatedRoute,
    private logic:LogicService,
    private actionSheetController: ActionSheetController
  ) {
    this.title = this.route.snapshot.paramMap.get('name');
    this.categoryId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getLaundriesById();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 500);
  }
  getLaundriesById() {
    // this.isLoading = true;
    // setTimeout(() => {
    //   this.isLoading = false;
    //   console.log('1');
    // }, 2000);

    // laundryByCategory
    this.logic.laundryByCategory$.subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.allLaundries = value['data'];
        
      },
      error:async(error:any) =>{
        console.log(error);
        
      }
    })
  }

  onSearchChange(ev: any) {}

  openPage(page: string) {
    this.router.navigate([page]);
  }
  applyFilter() {
    this.haptics.hapticsImpactLight();
  }
}
