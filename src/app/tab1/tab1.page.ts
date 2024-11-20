import { Component } from '@angular/core';
import { HapticsService } from '../services/haptics.service';
import { Router } from '@angular/router';
import { LogicService } from '../services/logic.service';
import { Geolocation, Position } from '@capacitor/geolocation';
import {
  NativeSettings,
  AndroidSettings,
  IOSSettings,
} from 'capacitor-native-settings';

import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  coordinates!: Position;
  categories:any[] = [];
   allLaundries:any[] = [];

   userId:any;

  constructor(private haptics: HapticsService,
              private router: Router,
              private geolocation: Geolocation,
              private logic:LogicService,
              private alertController: AlertController,
              private storage: DataService
  ) {}

  ionViewDidEnter(){
    this.getUserId();
    this.getAllLaundries();
    this.getAllCategories();
    // this.checkForGrantedPermission();
   

  }


  async getUserId(){
    this.userId = await this.logic.getUserId();
    console.log(`UserId in tab1 page ${this.userId}`);
    
  }


  getAllCategories(){
    this.logic.category$.subscribe({
      next:async(value:any) =>{
        console.log("The Categories");
        
        console.log(value);
        this.categories = value['data'];
        
      },
      error:async(error:any) =>{
        console.log(error);
        
      }
    })

    
  }


  getAllLaundries(){
    this.logic.getAllLaundries().subscribe({
      next:async(value:any) =>{
        console.log("Shops Fetched!");
        
        console.log(value);
        this.allLaundries = value['data']['content'];
        
      },
      error:async(error:any) =>{
        console.log(error);
        
      }
    })
  }
  openPage(page:string){
    this.router.navigate([page]);
    this.haptics.hapticsImpactLight();
  }

  openLaundryServicePage(ev:any){
    console.log("Laundry id received in event");
    console.log(ev);
    // view-laundry/Washing/1/add
    this.router.navigate(["view-laundry", ev.name, ev.id,"add",ev.id]);
    
    
  }

  async checkForGrantedPermission() {
    let granted = await this.storage.get('permission');
    console.log(granted);

    if (granted) {
      this.checkPermissionsAndGetCurrentLocation();
    } else {
      this.presentLocationConfirmAlert();
    }
  }
  async presentLocationConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Allow DROPEAT location permission when your are using the app.',
      message: 'It helps us to provide you with great deals!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            console.log('Confirm Cancel: blah');
            await this.storage.set('permission', 'true');
            this.checkPermissionsAndGetCurrentLocation();
          },
        },
        {
          text: 'Okay',
          handler: async () => {
            console.log('Confirm Okay');
            await this.storage.set('permission', 'true');
            this.checkPermissionsAndGetCurrentLocation();
          },
        },
      ],
    });

    let granted = await this.storage.get('permission');
    console.log(granted);

    await alert.present();
  }

  async checkPermissionsAndGetCurrentLocation() {
    try {
      let permission = await Geolocation.checkPermissions();
      console.log(permission.location);

      if (permission?.location != 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        console.log(requestStatus.location);
        this.logic.getAllCategories();
        this.logic.getAllLaundries();
        if (requestStatus?.location != 'granted') {
          //GO TO Settings Page To manually Enable Permission
          this.openSettings(true);
        }
      }

      let options: PositionOptions = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true,
      };

      let position = await Geolocation.getCurrentPosition(options);
      console.log(position.coords);
      this.coordinates = position;
      this.getAllCategories();
      this.getAllLaundries();
    } catch (e: any) {
      console.log(e);
      if (e?.message === 'Location services are not enabled') {
        await this.openSettings();
        this.getAllCategories();
        this.getAllLaundries();
      }
    }
  }

  openSettings(app = false) {
    console.log('Open Settings');
    return NativeSettings.open({
      optionAndroid: app
        ? AndroidSettings.ApplicationDetails
        : AndroidSettings.Location,
      optionIOS: app ? IOSSettings.App : IOSSettings.LocationServices,
    });
  }
}
