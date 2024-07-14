import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: any = FormGroup;
  submitted = false;

  constructor(
    private router: Router,

    private haptics: HapticsService,
    private LoadingCtrl: LoadingController,

    public toastController: ToastController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      // name: [null, [Validators.required, Validators.minLength(5)]],
      // dob: [null, [Validators.required]],
      // email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      // password: [null, [Validators.required, Validators.minLength(6)]],
      // confirmPassword: [null, [Validators.required]],
      mobnoctrl: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
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

    // this.router.navigate(['otp']);
    this.router.navigate(['tabs', 'tabs','tab1']);
  }

  saveDetails() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
  }
  class = '';

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
}
