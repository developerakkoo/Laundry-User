import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-screen-video',
  templateUrl: './full-screen-video.component.html',
  styleUrls: ['./full-screen-video.component.scss'],
})
export class FullScreenVideoComponent  implements OnInit {
  @Input() videoUrl!: string;

  ngAfterViewInit() {
    this.setupFullScreen();
  }

  setupFullScreen() {
    const videoElement = document.getElementById('video') as HTMLVideoElement;

  //   videoElement.addEventListener('loadedmetadata', () => {
  //     videoElement.requestFullscreen().catch(err => {
  //       console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
  //     });
  //   });
  }
  constructor() { }

  ngOnInit() {}

}
