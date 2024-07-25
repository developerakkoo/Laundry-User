import { Component } from '@angular/core';
import { HapticsService } from '../services/haptics.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  totalprice:number = 1200;
  constructor(private haptics:HapticsService,
              private router: Router,
              private actionSheetController: ActionSheetController
  ) {}


  checkout(){
   
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose Delivery Option',
      animated:true,
      backdropDismiss:true,
      mode:"ios",
      buttons: [{
        text: 'Normal Delivery(1-2 Days)',
        icon: 'sunny',
        role:'selected'
,        handler: () => {
          console.log('Delete clicked');
          this.haptics.hapticsImpactLight();
          this.router.navigate(['payment-success']);
        }
      }, {
        text: 'Express Delivery(One day delivery)',
        icon: 'rocket',
        handler: () => {
          console.log('Share clicked');
          this.haptics.hapticsImpactLight();
          this.router.navigate(['payment-success']);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
  
    await actionSheet.present();
  }
}
