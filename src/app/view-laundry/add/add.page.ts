import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddOrderModalPage } from '../add-order-modal/add-order-modal.page';
import { HapticsService } from 'src/app/services/haptics.service';
interface Item {
  item: string;
  quantity: number;
  note: string;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  items:any[] = [];
  newItem: Item = {
    item: '',
    quantity: 0,
    note: ''
  };
  constructor(private router:Router,
              private route:ActivatedRoute,
              private haptics: HapticsService,
              private actionSheetController: ActionSheetController,
              private modalController: ModalController
  ) { }

  ngOnInit() {
  }


  async presentActionSheetForDeliveryPickupOrSelf() {
    this.haptics.hapticsImpactLight();
    const actionSheet = await this.actionSheetController.create({
      header: 'Pickup / Self',
      
      buttons: [{
        text: 'Self Pickup',
        icon: 'trash',
        handler: () => {
          
            console.log('Delete clicked');
        }
      }, {
        text: 'Schedule Pickup',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
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


  async presentModal() {
    this.haptics.hapticsImpactLight();
    const modal = await this.modalController.create({
    component: AddOrderModalPage,
    componentProps: { value: 123 },
    breakpoints:[0, 0.25,0.5, 0.75],
    initialBreakpoint:0.75,
   handle:true,
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data.data)
    this.addItem(data.data);
  
  }


  addItem(data:Item) {
  
      this.items.push({ ...data });
      this.newItem = { item: '', quantity: 0, note: '' };
      console.log(this.items);
    this.haptics.hapticsImpactLight();
      
    
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.haptics.hapticsVibrate();

  }
  addToOrder(){
    this.presentModal();

  }



}
