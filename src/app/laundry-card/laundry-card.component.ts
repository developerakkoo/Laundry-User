import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-laundry-card',
  templateUrl: './laundry-card.component.html',
  styleUrls: ['./laundry-card.component.scss'],
})
export class LaundryCardComponent  implements OnInit {
  @Input() imageUrl!: string;
  @Input() name!: string;
  @Input() ratings!: string;
  @Input() address!: string;
  constructor() { }

  ngOnInit() {}

}
