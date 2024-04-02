import { Component } from '@angular/core';
import { DigimonService } from 'src/app/services/http/digimon.service';
import { DigimonItem } from '../../interfaces/digimons';
import { GlobalService } from 'src/app/shared/global.service';
import { Digimon } from 'src/app/interfaces/digimon';
import { InfiniteScrollCustomEvent, ModalOptions } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PageableService } from '../../shared/pageable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{
  itemsSkeleton: number[] = Array(20).fill(0).map((x, i) => i);
  isLoading:boolean=true;
  listDigimonItem : DigimonItem[] = [];

  constructor(
    private global : GlobalService,
    private digimonService :DigimonService,
    private pageableService:PageableService
  ) {}

  ngOnInit() {
    this.loadDataDigimons();
  }

  async loadDataDigimons(){
    try {
      const pageable = this.pageableService.pageable;
      const page = pageable?.currentPage ?? 0;
      const response:any =  await this.digimonService.getListDigimons(page);
      if(response.content){
        this.listDigimonItem.push(...response.content);
      }
      if (response.pageable) {
        this.pageableService.pageable = { ...response.pageable, currentPage: response.pageable.currentPage + 1};
      }
    } catch (error) {
      this.global.errorToast();
    }finally{
      this.isLoading = false;
    }
  }

  async searchDigimonById(id:number){
    const loader = await this.global.showLoader();
    try {
      const resp :any= await this.digimonService.getDigimonById(id)
      this.openModal(resp)
    } catch (error) {
      this.global.errorToast();
    }finally{
      loader.dismiss()
    }
  }



  async openModal(digimon:Digimon){
    try {
      const modal = await this.global.createModal({
        component: ModalComponent,
        cssClass: 'custom-modal',
        animated:true,
        componentProps: { digimon }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async onIonInfinite(ev:any) {
    const page = this.pageableService.pageable?.currentPage ?? 0;
    const totalPages =  this.pageableService.pageable?.totalPages;
    if(page === totalPages){
      (ev as InfiniteScrollCustomEvent).target.complete();
      return;
    }
    await this.loadDataDigimons();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
}
