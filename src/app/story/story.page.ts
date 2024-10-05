import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {

  interval :any;
  constructor(private router: Router) { }

  ngOnInit() {
  }


  ionViewDidEnter(){
    this.interval = setInterval(() =>
      {
      this.router.navigate(['tabs','tabs','tab1']);
    },3000)
  }

  ionViewDidLeave(){
    clearInterval(this.interval);
  }
}
