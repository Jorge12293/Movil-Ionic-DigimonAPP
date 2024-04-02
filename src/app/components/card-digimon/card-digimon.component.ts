import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DigimonItem } from 'src/app/interfaces/digimons';
import { Assets } from 'src/app/urls/assets';

@Component({
  selector: 'card-digimon',
  templateUrl: './card-digimon.component.html',
  styleUrls: ['./card-digimon.component.scss'],
})
export class CardDigimonComponent  implements OnInit {
  @Input() digimonItem!:DigimonItem;
  @Output() idDigimonEvent = new EventEmitter<number>();
  assets=Assets;
  constructor() { }

  ngOnInit() {}


  async searchPokemonById(id:number){
    this.idDigimonEvent.emit(id);
  }

}
