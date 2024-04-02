import { Component, Input, OnInit } from '@angular/core';
import { Digimon } from 'src/app/interfaces/digimon';
import { GlobalService } from 'src/app/shared/global.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() digimon!: Digimon;

  constructor(
    private global: GlobalService
  ) { }

  ngOnInit() { }

  dismiss() {
    this.global.modalDismiss();
  }

}
