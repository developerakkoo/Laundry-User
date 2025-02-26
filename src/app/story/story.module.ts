import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoryPageRoutingModule } from './story-routing.module';

import { StoryPage } from './story.page';
import { FullScreenVideoComponent } from '../components/full-screen-video/full-screen-video.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoryPageRoutingModule
  ],
  declarations: [StoryPage, FullScreenVideoComponent]
})
export class StoryPageModule {}
