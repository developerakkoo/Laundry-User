import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchbarCustomEvent } from '@ionic/angular';
import { LogicService } from '../services/logic.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  laundryFilter: any = { name: '' };
  allLaundries: any[] = [];

  constructor(private router: Router, private logic: LogicService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getAllLaundries();
  }
  onSearchChange(ev: SearchbarCustomEvent) {
    console.log(ev.detail.value);
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
  onClearEvent(ev: any) {
    console.log(ev);
    // this.router.navigate(['tabs', 'tab1']);
  }
}
