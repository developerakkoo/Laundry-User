import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent  implements OnInit {

  interval:any;
  constructor() { }

  ngOnInit() {

    setInterval(() =>{
      this.animate();
    },1000)
  }

  animate(){
    let title = document.querySelectorAll('.title');
    title[0].innerHTML = "Offers";
    title[1].innerHTML = "Express Fast";
    title[2].innerHTML = "Nearby";
    title[3].innerHTML = "Subscriptions";
    title?.forEach((t) =>{
      t.classList.add('entry');
    })
    console.log(title);
    setTimeout(() =>{
      let title = document.querySelectorAll('.title');
      title[0].innerHTML = "Upto 50% Off!";
      // title[1].innerHTML = "Within a data!";
      // title[2].innerHTML = "all nearby!";
      // title[3].innerHTML = "Best For you!";
    console.log(title);
    },5000)
  }

  exit(){
    
  }



}
