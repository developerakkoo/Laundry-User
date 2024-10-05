import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-laundry-card',
  templateUrl: './laundry-card.component.html',
  styleUrls: ['./laundry-card.component.scss'],
})
export class LaundryCardComponent  implements OnInit {
  @Input() imageUrl!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() ratings!: string;
  @Input() address!: string;
  heartIcon:string = 'heart-outline';
  isLiked:boolean = false;

  @Output() clickEvent = new EventEmitter();
  constructor(private haptics: HapticsService,

  ) { }

  ngOnInit() {}

  action(type:string){
    if(type === 'like'){
      console.log('like');
      this.heartIcon = 'heart';
      if(this.isLiked == true){
        this.isLiked = false;
        this.heartIcon = 'heart-outline';
      }else  if(this.isLiked == false){
        this.isLiked = true;
        this.heartIcon = 'heart';
      }
      this.haptics.hapticsImpactLight();
    }
    else {
      console.log("share");
      this.haptics.hapticsImpactLight();
      
    }
  }

  clickHandler(){
    this.clickEvent.emit(this.id);
  }
}
