import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { HapticsService } from '../services/haptics.service';
import { UserService } from '../services/user.service';
import { LogicService } from '../services/logic.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: any = FormGroup;
  submitted = false;
  @ViewChild('input') input: any;
  constructor(
    private router: Router,
    private data: DataService,
    private haptics: HapticsService,
    private LoadingCtrl: LoadingController,
    private logic: LogicService,
    public toastController: ToastController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
  }

  ionViewDidEnter() {
    this.input.setFocus();
  }
  async login() {
    // const loading = await this.LoadingCtrl.create({
    //   message: "Please wait...",
    // });
    // loading.present();
    // let body = {
    // }
    this.haptics.hapticsImpactLight();
  }

  getOTP() {
    this.haptics.hapticsImpactLight();
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
      this.logic.login(this.form.value).subscribe({
        next: async (value: any) => {
          console.log(value);
          this.submitted = false;
          let userId = value['data']['_id'];
          let accessToken = value['data']['accessToken'];
          console.log(userId);
          console.log(accessToken);
          await this.data.set('userId', userId);
          await this.data.set('accessToken', accessToken);
          // this.router.navigate(['otp', this.form.value.phoneNumber]);
          this.router.navigate(['story']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.submitted = false;
        },
      });
    }
    // setTimeout(() =>{
    //   this.submitted = false;
    //   this.router.navigate(['otp', this.form.value.mobnoctrl]);
    // },1000)
    // this.router.navigate(['tabs', 'tabs','tab1']);
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
}
