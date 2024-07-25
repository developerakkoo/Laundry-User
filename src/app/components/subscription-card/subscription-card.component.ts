import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss'],
})
export class SubscriptionCardComponent  implements OnInit {

  planNumber:any = 1;
  @ViewChild("first") first!:ElementRef;
  @ViewChild("second") second!:ElementRef;
  @ViewChild("badge") badge!:ElementRef;
  constructor() { }

  ngOnInit() {}

  radioButtonEvent(ev:any){
    console.log(ev.detail.value);
    let value = ev.detail.value;
    if(value == 1){
      this.first.nativeElement.classList.add("active");
      this.badge.nativeElement.classList.add("active");
      this.second.nativeElement.classList.remove("active");

    }
    if(value == 2){
      this.second.nativeElement.classList.add("active");
      this.first.nativeElement.classList.remove("active");
      this.badge.nativeElement.classList.remove("active");

      
    }
  }
  select(type:any)
  {
    console.log(type);
    this.planNumber = type;
    
  }
}
