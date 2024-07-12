import { Component } from '@angular/core';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private haptics: HapticsService) {}

  haptic(){
    this.haptics.hapticsImpactLight();
  }
}
