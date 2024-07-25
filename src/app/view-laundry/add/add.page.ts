import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
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

  items:any[] = [  ];
  newItem: Item = {
    item: '',
    quantity: 0,
    note: ''
  };
  constructor(private router:Router,
              private route:ActivatedRoute,
              private haptics: HapticsService,
              private toastController: ToastController,
              private actionSheetController: ActionSheetController,
              private modalController: ModalController
  ) { }

  ngOnInit() {
    this.items.push( {
      "_id": "66a0d16483d5aa0964cd09ef",
      "name": "shirt washing",
      "type": 1,
      "description": "rerum praesentium soluta",
      "shopeId": "66a0ce2183d5aa0964cd09e0",
      "categoryId": "66a0cc7e83d5aa0964cd09b4",
      "perPeacePrice": 40,
      "quantityAcceptedIn": 0,
      "status": 0,
      "createdAt": "2024-07-24T10:03:16.002Z",
      "updatedAt": "2024-07-24T10:03:16.002Z",
      "__v": 0
  },
  {
      "_id": "66a0d21583d5aa0964cd09f2",
      "name": "t-shirt washing",
      "type": 1,
      "description": "alias natus necessitatibus",
      "shopeId": "66a0ce2183d5aa0964cd09e0",
      "categoryId": "66a0cc7e83d5aa0964cd09b4",
      "perPeacePrice": 35,
      "quantityAcceptedIn": 0,
      "status": 0,
      "createdAt": "2024-07-24T10:06:13.781Z",
      "updatedAt": "2024-07-24T10:06:13.781Z",
      "__v": 0
  },
  {
      "_id": "66a0d23183d5aa0964cd09f5",
      "name": "Jeans washing",
      "type": 1,
      "description": "Adipisci quisquam saepe aut et.",
      "shopeId": "66a0ce2183d5aa0964cd09e0",
      "categoryId": "66a0cc7e83d5aa0964cd09b4",
      "perPeacePrice": 50,
      "quantityAcceptedIn": 0,
      "status": 0,
      "createdAt": "2024-07-24T10:06:41.714Z",
      "updatedAt": "2024-07-24T10:06:41.714Z",
      "__v": 0
  },
  {
      "_id": "66a0d2a067025c7edd098863",
      "name": "curtains washing",
      "type": 1,
      "description": "et qui non",
      "shopeId": "66a0ce2183d5aa0964cd09e0",
      "categoryId": "66a0cc7e83d5aa0964cd09b4",
      "perKgPrice": 100,
      "quantityAcceptedIn": 1,
      "status": 0,
      "createdAt": "2024-07-24T10:08:32.093Z",
      "updatedAt": "2024-07-24T10:08:32.093Z",
      "__v": 0
  },
  {
      "_id": "66a0d54c67025c7edd098891",
      "name": "Shirt Dry Clean",
      "type": 2,
      "description": "assumenda error in",
      "shopeId": "66a0ce2183d5aa0964cd09e0",
      "categoryId": "66a0cc9e83d5aa0964cd09bc",
      "perPeacePrice": 60,
      "quantityAcceptedIn": 0,
      "status": 0,
      "createdAt": "2024-07-24T10:19:56.912Z",
      "updatedAt": "2024-07-24T10:19:56.912Z",
      "__v": 0
  });
   
    
  }

  async presentToast(msg:string, duration:any, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      color: color,
      position:'bottom',
      animated:true,
      icon:'rocket',
      mode:'ios'
    });
    toast.present();
  }

  onSearchChange(ev:any){

  }
  async presentActionSheetForDeliveryPickupOrSelf() {
    this.haptics.hapticsImpactLight();
    const actionSheet = await this.actionSheetController.create({
      header: 'Pickup / Self',
      
      buttons: [{
        text: 'Self Pickup',
        icon: 'walk',
        handler: () => {
          this.presentToast("Self Pickup Scheduled!", 2000, "success");
            console.log('Delete clicked');
        }
      }, {
        text: 'Schedule Pickup',
        icon: 'bicycle',
        handler: () => {
          this.presentToast("Order Pickup Scheduled!", 2000, "success");

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
  
  }


  addItem() {
  
      // this.items.push({ ...data });
      // this.newItem = { item: '', quantity: 0, note: '' };
      // console.log(this.items);
      this.presentToast("Item Added to cart", 2000, "primary");
    this.haptics.hapticsImpactLight();
      
    
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.haptics.hapticsVibrate();

  }
  addToOrder(){
    this.presentModal();

  }
  applyFilter(){
    this.haptics.hapticsImpactLight();
  }


}
