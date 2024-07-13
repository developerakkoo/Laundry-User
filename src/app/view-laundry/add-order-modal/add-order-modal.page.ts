import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, RangeCustomEvent } from '@ionic/angular';
import { HapticsService } from 'src/app/services/haptics.service';

@Component({
  selector: 'app-add-order-modal',
  templateUrl: './add-order-modal.page.html',
  styleUrls: ['./add-order-modal.page.scss'],
})
export class AddOrderModalPage implements OnInit {

  form!:FormGroup;
  quantity:number = 1;
  
  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder,
              private haptics: HapticsService
  ) {
    this.form = this.formBuilder.group({
      item:[,[Validators.required]],
      quantity:[,[]],
      note:[,[Validators.required]],
    })
   }

  ngOnInit() {
    
  }
  close(){
    this.modalController.dismiss();
  }
  onIonKnobMoveStart(ev: Event) {
    console.log('ionKnobMoveStart:', (ev as RangeCustomEvent).detail.value);
    this.haptics.hapticsImpactLight();
  }

  onIonKnobMoveEnd(ev: Event) {
    console.log('ionKnobMoveEnd:', (ev as RangeCustomEvent).detail.value);
    this.haptics.hapticsImpactMedium();
  }

  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
      this.modalController.dismiss(this.form.value);
    }
  }
}
