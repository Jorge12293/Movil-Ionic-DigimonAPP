import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDigimonComponent } from './card-digimon/card-digimon.component';
import { IonicModule } from '@ionic/angular';
import { CardDigimonDetailComponent } from './card-digimon-detail/card-digimon-detail.component';
import { ModalComponent } from './modal/modal.component';
import { CardSkeletonComponent } from './card-skeleton/card-skeleton.component';

const lisComponents = [
  CardDigimonComponent,
  CardDigimonDetailComponent,
  ModalComponent,
  CardSkeletonComponent
]


@NgModule({
  declarations: [
    ...lisComponents,
  ],
  exports: [
    ...lisComponents,
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
