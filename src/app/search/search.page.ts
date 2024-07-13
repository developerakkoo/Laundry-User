import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchbarCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearchChange(ev:SearchbarCustomEvent){
    console.log(ev.detail.value);
    
  }

  onClearEvent(ev:any){
    console.log(ev);
    // this.router.navigate(['tabs', 'tab1']);
  }
}
