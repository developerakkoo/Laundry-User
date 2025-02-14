import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { DataService } from './services/data.service';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private data: DataService) {
    this.checkForLoginStatus();
  }

  async checkForLoginStatus() {
    let userId = await this.data.get('userId');
    console.log(userId);
    if (userId != null || userId != undefined) {
      console.log('userid not null');
      //this.router.navigateByUrl("view-laundry/Akshay%20Laundry/66fd2f3d5db1311f2a81658e/add/66fd2f3d5db1311f2a81658e");
      // this.router.navigate(['block']);
      this.router.navigate(['tabs', 'tabs', 'tab1']);
    } else {
      this.router.navigate(['']);
    }
  }
}
