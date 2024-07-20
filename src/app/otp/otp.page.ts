import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  @ViewChild('input1') input1!: any;
  @ViewChild('input2') input2!: any;
  @ViewChild('input3') input3!: any;
  @ViewChild('input4') input4!: any;
  phoneNumber: any;
  isOtpVerified: boolean = false;
  otp: string[] = ['', '', '', ''];
  otpInputs: any[] = new Array(4);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private haptics: HapticsService,
    private toastController: ToastController
  ) {
    this.phoneNumber = this.route.snapshot.paramMap.get("phone");
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.input1.setFocus();
  }

  onInputOne(event: any, index: number) {
    console.log(event.target.value);

    console.log('OTP:', event.target.value);
    console.log('OTP:', event.target.value.length);
    if(event.target.value.length == 1){
      this.otp[0] = event.target.value;
      this.haptics.hapticsImpactLight();
      this.input2.setFocus();
    }
    if(event.target.value.length == 0){
      this.otp[0] = event.target.value;
      console.log(this.otp.join('').toString());
      this.haptics.hapticsImpactLight();

      
      
    }
  }

  onInputTwo(event: any, index: number) {
    console.log(event.target.value);

    console.log('OTP:', event.target.value);
    if(event.target.value.length == 1){
      this.otp[1] = event.target.value;
      this.haptics.hapticsImpactLight();

      this.input3.setFocus();
    }
    if(event.target.value.length == 0){
      this.otp[1] = event.target.value;
      console.log(this.otp.join('').toString());
      this.haptics.hapticsImpactLight();

      this.input1.setFocus();
      
    }
  }
  onInputThree(event: any, index: number) {
    console.log(event.target.value);

    console.log('OTP:', event.target.value);
    if(event.target.value.length == 1){
      this.otp[2] = event.target.value;
      this.haptics.hapticsImpactLight();

      this.input4.setFocus();
    }
    if(event.target.value.length == 0){
      this.otp[2] = event.target.value;
      console.log(this.otp.join('').toString());
      this.haptics.hapticsImpactLight();

      this.input2.setFocus();
      
    }
  }
  onInputFour(event: any, index: number) {
    console.log(event.target.value);

    console.log('OTP:', event.target.value);
    if(event.target.value.length == 1){
      this.otp[3] = event.target.value;
      this.haptics.hapticsImpactLight();

      console.log(this.otp.join('').toString());
      
    }
    if(event.target.value.length == 0){
      this.otp[3] = event.target.value;
      console.log(this.otp.join('').toString());
      this.haptics.hapticsImpactLight();

      this.input3.setFocus();
      
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    // Handle backspace key
    if (event.key === 'Backspace' && this.otp[index] === '' && index > 0) {
      const prevInput = document.querySelectorAll('.inputs')[
        index - 1
      ] as HTMLElement;
      prevInput.focus();
    }
  }
  setFocus(index: number) {}
  verifyOtp() {
    this.isOtpVerified = true;
    setTimeout(() =>{
      this.isOtpVerified = false;
      this.router.navigate(['tabs','tabs', 'tab1']);
    },2000)
  }
}
