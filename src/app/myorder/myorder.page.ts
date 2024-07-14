import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.page.html',
  styleUrls: ['./myorder.page.scss'],
})
export class MyorderPage implements OnInit {

  isRecentOrder:boolean = true;
  constructor() { }

  ngOnInit() {
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
