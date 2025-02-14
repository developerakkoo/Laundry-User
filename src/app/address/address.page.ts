import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { LogicService } from '../services/logic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddAddressPage } from './add-address/add-address.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  address: any[] = [];

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private logic: LogicService,
    private storage: DataService
  ) {
    this.getAllAddress();
  }

  ngOnInit() {}

  getAllAddress() {
    this.logic.getAllAddress().subscribe({
      next: async (value: any) => {
        console.log(value);
        this.address = value['data'];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  close() {
    this.modalController.dismiss();
  }

  async setAddressDefault(address: any) {
    console.log(address);
    await this.storage.set('address', address);
    // this.user.address.next(address);
    this.modalController.dismiss(address);
  }
  async openAddAddressPage() {
    // this.close();

    const modal = await this.modalController.create({
      component: AddAddressPage,
      // componentProps: { value: this.coordinates },
    });

    await modal.present();
    const data = await modal.onDidDismiss();
    console.log(data);
    this.getAllAddress();
  }
}
