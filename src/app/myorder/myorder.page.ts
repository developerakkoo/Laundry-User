import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { HapticsService } from '../services/haptics.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.page.html',
  styleUrls: ['./myorder.page.scss'],
})
export class MyorderPage implements OnInit {

  isRecentOrder:boolean = true;

  orders:any[] = [];
  isLoading:boolean = false;
  constructor(private logic: LogicService,
              private haptics:HapticsService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
this.getOrders();
  }


  getOrders(){
    this.logic.getAllUserOrders()
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        
      },
      error:(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  segmentChanged(ev:any){
    console.log(ev.detail.value);
    let segmentNo = ev.detail.value;
    if(segmentNo === 1){
      console.log("Recent Orders");
      this.isRecentOrder = true;
      
    }else if(segmentNo === 2){
      console.log("Previous Orders");
      this.isRecentOrder = false;

    }
  }

}
