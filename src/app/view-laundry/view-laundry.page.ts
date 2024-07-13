import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { HapticsService } from '../services/haptics.service';
@Component({
  selector: 'app-view-laundry',
  templateUrl: './view-laundry.page.html',
  styleUrls: ['./view-laundry.page.scss'],
})
export class ViewLaundryPage implements OnInit {
  swiperModules = [IonicSlides];
  title:any;
  categoryId:any;

  isLoading:boolean = false;
  constructor(private router: Router,
    private haptics: HapticsService,
              private route: ActivatedRoute
  ) { 
    this.title = this.route.snapshot.paramMap.get("name");
    this.categoryId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.getLaundriesById();
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 200);
  }
   getLaundriesById(){
    this.isLoading = true;
    setTimeout(() =>{
      this.isLoading = false;
      console.log("1");
      
    },200)
  }


  openPage(page:string){
    this.router.navigate([page])
  }
  applyFilter(){
    this.haptics.hapticsImpactLight();
  }
}
