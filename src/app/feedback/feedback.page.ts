import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  backgroundColor: string = 'light';
  constructor() { }

  ngOnInit() {
  }
  setFeedback(feedback: string) {
    switch (feedback) {
      case 'happy':
        this.backgroundColor = 'success';
        console.log("happy");
        
        break;
      case 'neutral':
        this.backgroundColor = 'warning';
        console.log("neutral");

        break;
      case 'sad':
        this.backgroundColor = 'danger';
        console.log("sad");

        break;
      default:
        this.backgroundColor = 'white';
        break;
    }

  }
}
