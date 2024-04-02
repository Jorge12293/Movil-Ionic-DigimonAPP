import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Endpoints } from 'src/app/urls/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DigimonService {

  constructor(
    private http:HttpClient
  ) { }

  async getListDigimons(page:number=0,pageSize:number=20){
    try{
      const response = await lastValueFrom(
        this.http.get(`${Endpoints.urlApiV1Digimon}?page=${page}&pageSize=${pageSize}`)
      );
      return response;
    }catch(error){
      throw (error);
    }
  }

  async getDigimonById(id:number){
    try{
      const response = await lastValueFrom(
        this.http.get(`${Endpoints.urlApiV1Digimon}/${id}`)
      );
      return response;
    }catch(error){
      throw (error);
    }
  }

}
