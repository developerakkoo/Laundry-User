import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { LogicService } from 'src/app/services/logic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  @Input() value: any;
  @Input() location: any;
  form: FormGroup;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private logic: LogicService,
    private toastController: ToastController
  ) {
    this.form = this.formBuilder.group({
      address: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      pinCode: [, [Validators.required]],
      type: [, [Validators.required]],
      selected: [, [Validators.required]],
    });
  }

  ngOnInit() {
    // console.log(this.value);
    // console.log(this.location);
    // this.form.patchValue({ address: this.value });
  }

  close() {
    this.modalController.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your address Added!.',
      duration: 2000,
      animated: true,
      mode: 'ios',
      color: 'primary',
    });
    toast.present();
  }

  async onSubmit() {
    if (this.form.valid) {
      console.log({
        address: this.form.value.address,
        type: this.form.value.type,
        selected: this.form.value.isSelected,
        lat: 18.454545,
        lng: 18.454545,
      });
      this.logic
        .addUserAddress({
          address: this.form.value.address,
          landmark: this.form.value.landmark,
          pinCode: this.form.value.pinCode,
          type: this.form.value.type,
          selected: this.form.value.isSelected,
          lat: 17.56567,
          lng: 18.56565,
        })
        .subscribe({
          next: async (value: any) => {
            console.log(value);
            this.presentToast();
            this.close();
          },
          error: async (error: HttpErrorResponse) => {
            console.log(error.error.message);
          },
        });
    }
  }
}
