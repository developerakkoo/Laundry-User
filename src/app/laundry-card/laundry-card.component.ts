import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HapticsService } from '../services/haptics.service';
import { LogicService } from '../services/logic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
  @Input() likes!: string[]; // Array of user IDs who liked this shop
  @Input() currentUserId!: string;
  @Input() category!: string;
  @Input() categories:[] = [];

  @Output() clickEvent = new EventEmitter();
  constructor(private haptics: HapticsService,
    private logic: LogicService,
    private router:Router

  ) { }

  async ngOnInit() {
    // this.currentUserId = await this.logic.getUserId();
    console.log(`UserId in Laundry CArd Component:- ${this.currentUserId}`);
    this.isLiked = this.likes.includes(this.currentUserId);
    console.log(`User Like Status:- ${this.isLiked} for ${this.id}`);
    
    
  }



  action(type:string){
    if(type === 'like'){
      console.log('like');
      this.heartIcon = 'heart';
      if(this.isLiked == true){
        this.isLiked = false;
        this.heartIcon = 'heart-outline';
        this.unlikeShop();
      }else  if(this.isLiked == false){
        this.isLiked = true;
        this.heartIcon = 'heart';
        this.likeShop();
      }
      this.haptics.hapticsImpactLight();
    }
    else {
      console.log("share");
      this.haptics.hapticsImpactLight();
      
    }
  }


  likeShop(){
    this.logic.like(this.id)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.likes.push(this.currentUserId);
        console.log("Shop Liked");
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        this.isLiked = false;
      }
    })
  }


  unlikeShop(){
    this.logic.unlike(this.id)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.likes = this.likes.filter(id => id !== this.currentUserId);
        console.log("Shop unLiked!");
        
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        this.isLiked = true;
        
      }
    })
  }
  clickHandler(){
    this.router.navigate(["view-laundry", this.name, this.id,"add",this.id]);
    this.clickEvent.emit({id:this.id, category:this.category});
  }

  share(){
    console.log("Share clicked!");
    
  }
}
