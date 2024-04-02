import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  async setData<T>(data: T,pathKey:string){
    await Preferences.set({ key: pathKey, value: JSON.stringify(data) });
  }

  async getData<T>(pathKey:string): Promise<T | null >{
    const {value} = await Preferences.get({ key: pathKey});
    return value ? JSON.parse(value) as T : null;
  }

  async removeData(pathKey:string) {
     await Preferences.remove({ key:pathKey});
  }

}
