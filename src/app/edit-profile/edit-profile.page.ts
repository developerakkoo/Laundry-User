import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HapticsService } from '../services/haptics.service';
import { LogicService } from '../services/logic.service';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private haptics: HapticsService,
    private logic: LogicService,
    private modalController: ModalController,
    private toastController: ToastController,
    private storage: DataService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      animated: true,
      mode: 'ios',
      color: 'success',
      layout: 'baseline',
    });
    toast.present();
  }

  async onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.logic.updateUserProfile(this.form.value).subscribe({
        next: async (value: any) => {
          console.log(value);
          this.presentToast('Profile updated Successfully!');
          await this.storage.set('profileUpdated', '1');
          this.logic.init();
          let modal = await this.modalController.getTop();
          modal?.dismiss();
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
    }
  }
}
