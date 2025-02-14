import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { AddOrderModalPage } from '../add-order-modal/add-order-modal.page';
import { HapticsService } from 'src/app/services/haptics.service';
import { LogicService } from 'src/app/services/logic.service';
import { HttpErrorResponse } from '@angular/common/http';
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

  laundryId:any;

  products:any[] = [];
  items:any[] = [  ];
  newItem: Item = {
    item: '',
    quantity: 0,
    note: ''
  };

  // users: any[] = [{ name: 'John' }, { name: 'Jane' }, { name: 'Mario' }];
  productFilter: any = { name: '' };
  constructor(private router:Router,
              private route:ActivatedRoute,
              private logic:LogicService,
              private haptics: HapticsService,
              private toastController: ToastController,
              private actionSheetController: ActionSheetController,
              private modalController: ModalController
  ) { }

  ngOnInit() {
   
    this.laundryId = this.route.snapshot.paramMap.get('id');
    
  }


  ionViewDidEnter(){
    this.fetchCartAndServices();
    // this.getAllServices();
    this.getCart();
  }
  // categoryId
  // : 
  // "66a7496d1f27b4f5fb506c1d"
  // createdAt
  // : 
  // "2024-10-02T15:43:51.089Z"
  // description
  // : 
  // "jeans washing service"
  // image_url
  // : 
  // "https://api.breezyemart.com/uploads/1727883836182-195779749.jpg"
  // name
  // : 
  // "Jeans"
  // perKgPrice
  // : 
  // 20
  // perPeacePrice
  // : 
  // null
  // quantityAcceptedIn
  // : 
  // 1
  // relativePath
  // : 
  // "uploads/1727883836182-195779749.jpg"
  // shopeId
  // : 
  // "66fd2f3d5db1311f2a81658e"
  // status
  // : 
  // 0
  // type
  // : 
  // 1
  // updatedAt
  // : 
  // "2024-10-02T15:43:56.193Z"
  // __v
  // : 
  // 0
  // _id
  // : 
  // "66fd6a37000063de85d7092d"
  async getAllServices(){
    this.logic.getServiceByLaundryId(this.laundryId)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.items = value['data']['content'];
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  async fetchCartAndServices(){
    this.logic.fetchCartAndServices(this.laundryId)
    .subscribe({
      next:async(value:any) =>{
        console.log("FEtch CArt and Services REsponse");
        
        console.log(value);
        this.items = value;
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
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


  addItem(ev:any) {
    console.log(ev);
    
    this.logic.addToCart(ev.id, ev.quantity, ev.type)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getCart();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
      // this.items.push({ ...data });
      // this.newItem = { item: '', quantity: 0, note: '' };
      // console.log(this.items);
     // this.presentToast("Item Added to cart", 2000, "primary");
    this.haptics.hapticsImpactLight();
      
    
  }

  deleteItem(ev:any) {
    this.logic.removeFromCart(ev.id, ev.quantity)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.haptics.hapticsVibrate();
        this.getCart();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        this.haptics.hapticsVibrate();
        
      }
    })
  }
  addToOrder(){
    this.presentModal();

  }

  getCart(){
    this.logic.getCart()
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.products = value['data']['products']
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }
  applyFilter(){
    this.haptics.hapticsImpactLight();
  }


}
