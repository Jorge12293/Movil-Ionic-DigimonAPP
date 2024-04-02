import { Component, Input, OnInit } from '@angular/core';
import { Digimon } from 'src/app/interfaces/digimon';
import { Assets } from 'src/app/urls/assets';

@Component({
  selector: 'card-digimon-detail',
  templateUrl: './card-digimon-detail.component.html',
  styleUrls: ['./card-digimon-detail.component.scss'],
})
export class CardDigimonDetailComponent  implements OnInit {
  @Input() digimon!: Digimon;
  assets=Assets;
  constructor( ) { }

  ngOnInit() {
  }

}
