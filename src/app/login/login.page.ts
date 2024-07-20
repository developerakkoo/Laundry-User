import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { HapticsService } from '../services/haptics.service';
import { UserService } from '../services/user.service';

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

    private haptics: HapticsService,
    private LoadingCtrl: LoadingController,
    private user: UserService,
    public toastController: ToastController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
    
      mobnoctrl: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
   
  }


  ionViewDidEnter(){
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
    setTimeout(() =>{
      this.submitted = false;
      this.router.navigate(['otp', this.form.value.mobnoctrl]);
    },1000)
    // this.router.navigate(['tabs', 'tabs','tab1']);
  }



  onReset() {
    this.submitted = false;
    this.form.reset();
  }
}
