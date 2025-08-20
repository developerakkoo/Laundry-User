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
export class LaundryCardComponent implements OnInit {
  @Input() imageUrl!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() ratings!: string;
  @Input() address!: string;
  @Input() likes: string[] = []; // Array of user IDs who liked this shop
  @Input() currentUserId!: string;
  @Input() category!: string;
  @Input() categories: any[] = [];

  @Output() clickEvent = new EventEmitter();

  isLiked: boolean = false;
  isProcessing: boolean = false;

  constructor(
    private haptics: HapticsService,
    private logic: LogicService,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log(`UserId in Laundry Card Component:- ${this.currentUserId}`);

    // Check if current user has liked this shop
    if (this.likes && this.currentUserId) {
      this.isLiked = this.likes.includes(this.currentUserId);
    }

    console.log(`User Like Status:- ${this.isLiked} for ${this.id}`);
  }

  action(type: string) {
    if (type === 'like') {
      if (this.isProcessing) return; // Prevent multiple clicks

      console.log('Like action triggered');
      this.haptics.hapticsImpactLight();

      if (this.isLiked) {
        this.unlikeShop();
      } else {
        this.likeShop();
      }
    } else if (type === 'share') {
      console.log('Share action triggered');
      this.haptics.hapticsImpactLight();
      this.share();
    }
  }

  likeShop() {
    this.isProcessing = true;

    this.logic.like(this.id).subscribe({
      next: async (value: any) => {
        console.log('Shop liked successfully:', value);
        this.isLiked = true;
        this.likes.push(this.currentUserId);
        this.haptics.hapticsImpactMedium();
        this.isProcessing = false;
      },
      error: async (error: HttpErrorResponse) => {
        console.error('Error liking shop:', error);
        this.isLiked = false;
        this.isProcessing = false;
        // You could add a toast notification here for error feedback
      },
    });
  }

  unlikeShop() {
    this.isProcessing = true;

    this.logic.unlike(this.id).subscribe({
      next: async (value: any) => {
        console.log('Shop unliked successfully:', value);
        this.isLiked = false;
        this.likes = this.likes.filter((id) => id !== this.currentUserId);
        this.haptics.hapticsImpactLight();
        this.isProcessing = false;
      },
      error: async (error: HttpErrorResponse) => {
        console.error('Error unliking shop:', error);
        this.isLiked = true;
        this.isProcessing = false;
        // You could add a toast notification here for error feedback
      },
    });
  }

  clickHandler() {
    this.haptics.hapticsImpactLight();
    this.router.navigate(['view-laundry', this.name, this.id, 'add', this.id]);
    this.clickEvent.emit({ id: this.id, category: this.category });
  }

  share() {
    console.log('Share functionality - implement sharing logic here');
    // You can implement actual sharing functionality here
    // For example: Web Share API, social media sharing, etc.
  }
}
