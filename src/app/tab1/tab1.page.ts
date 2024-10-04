import { Component } from '@angular/core';
import { HapticsService } from '../services/haptics.service';
import { Router } from '@angular/router';
import { LogicService } from '../services/logic.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

 
  categories:any[] = [ 
   
        
   ];
   allLaundries:any[] =[];


  constructor(private haptics: HapticsService,
              private router: Router,
              private logic:LogicService
  ) {}

  ionViewDidEnter(){
    this.logic.getAllCategories();
    this.logic.getAllLaundries();
    this.getAllCategories();
  }


  getAllCategories(){
    this.logic.category$.subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.categories = value['data'];
        
      },
      error:async(error:any) =>{
        console.log(error);
        
      }
    })

    this.logic.laundry$.subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.allLaundries = value['data'];
        
      },
      error:async(error:any) =>{
        console.log(error);
        
      }
    })
  }
  openPage(page:string){
    this.router.navigate([page]);
    this.haptics.hapticsImpactLight();
  }
}
